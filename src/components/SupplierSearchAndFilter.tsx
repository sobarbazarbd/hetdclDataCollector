import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Supplier } from "@/data/suppliers";

interface SupplierSearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
  suppliers: Supplier[];
}

const SupplierSearchAndFilter = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  suppliers
}: SupplierSearchAndFilterProps) => {
  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(suppliers.map(s => s.category))).sort();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers by name, contact, address, category, items, or remarks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter by Category */}
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
            {categories.map((category) => (
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

export default SupplierSearchAndFilter;