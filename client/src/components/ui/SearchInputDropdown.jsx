import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { ChevronDown, X, Loader2 } from "lucide-react";

export const SearchInputDropdown = ({
  options,
  onSelect,
  placeholder = "Search...",
  emptyText = "No results found",
  className,
  inputClassName,
  dropdownClassName,
  value,
  onChange,
  isLoading = false,
  renderItem,
  onSearch,
  debounceTime = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimer.current);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, filteredOptions.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0) {
      const itemElement = document.getElementById(
        `dropdown-item-${highlightedIndex}`
      );
      itemElement?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  // Handle debounced search
  useEffect(() => {
    if (onSearch && value) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearch(value);
      }, debounceTime);
    }
    return () => clearTimeout(debounceTimer.current);
  }, [value, onSearch, debounceTime]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const clearInput = () => {
    onChange("");
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn("pr-10", inputClassName)}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 text-muted-foreground animate-spin" />
        ) : value ? (
          <X
            className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:opacity-80 transition-opacity"
            onClick={clearInput}
          />
        ) : (
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full bg-popover border border-gray-200 rounded-sm shadow-xl overflow-auto",
            dropdownClassName
          )}>
          <ScrollArea className="max-h-60">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  id={`dropdown-item-${index}`}
                  className={cn(
                    "px-4 py-2 border-b border-gray-100 hover:bg-accent cursor-pointer transition-colors",
                    highlightedIndex === index && "bg-accent"
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}>
                  {renderItem ? (
                    renderItem(option, highlightedIndex === index)
                  ) : (
                    <>
                      <div className="font-normal">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-muted-foreground text-sm">
                {emptyText}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
