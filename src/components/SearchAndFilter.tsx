import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Contractor } from "@/pages/Dashboard";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
  contractors: Contractor[];
}

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  contractors
}: SearchAndFilterProps) => {
  // Get unique work categories for filter dropdown
  const workCategories = Array.from(new Set(contractors.map(c => c.workCategory))).sort();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search contractors by name, contact, address, category, or remarks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter by Work Category */}
      <div className="relative">
        <Select value={filterCategory} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full sm:w-48">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="Filter by category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {workCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilter;