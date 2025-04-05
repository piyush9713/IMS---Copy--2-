import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SearchDropdown = ({
  isOpen,
  onOpenChange,
  scopes,
  selectedScope,
  onScopeSelect,
}) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center text-sm outline-none text-accent-foreground">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
          <Separator className="absolute h-6 left-6" orientation="vertical" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 mt-4" align="start">
        <DropdownMenuLabel>Search in</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {scopes.map((scope) => (
          <DropdownMenuItem
            key={scope}
            onClick={() => {
              onScopeSelect(scope);
              onOpenChange(false);
            }}
            className={
              scope === selectedScope ? "bg-accent font-semibold" : ""
            }>
            {scope}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
