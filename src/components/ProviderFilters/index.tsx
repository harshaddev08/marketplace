"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ProviderFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const categories = [
  "All Categories",
  "Plumber",
  "Electrician",
  "Cleaner",
  "AC Repair",
  "Painter",
  "Auto Care",
  "Gardener",
  "Pest Control",
];

export const ProviderFilters = ({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProviderFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={category === cat ? "coral" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-2 transition-all duration-300 text-sm",
              category === cat
                ? "font-bold shadow-md scale-105"
                : "font-medium hover:border-coral/50 hover:bg-coral/5 text-muted-foreground hover:text-coral",
            )}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2 min-w-[180px]">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Sort by:
        </span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="h-10 bg-background border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="experience">Most Experienced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
