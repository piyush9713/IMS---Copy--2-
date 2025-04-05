// components/header/SearchBar.jsx
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";

const searchScopes = [
  "Sales Orders",
  "Customers",
  "Items",
  "Inventory Adjustments",
  "Packages",
  "Shipments",
  "Delivery Challans",
  "Invoices",
  "Sales Returns",
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchScope, setSearchScope] = useState(searchScopes[0]);

  return (
    <div className="relative w-80">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        placeholder={`Search in ${searchScope} ( / )`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-14"
      />

      <SearchDropdown
        isOpen={searchDropdownOpen}
        onOpenChange={setSearchDropdownOpen}
        scopes={searchScopes}
        selectedScope={searchScope}
        onScopeSelect={setSearchScope}
      />
    </div>
  );
};

export default SearchBar;
