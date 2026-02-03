"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Header,
  Footer,
  ProviderCard,
  ProviderSearch,
  ProviderFilters,
  Provider,
} from "@/components";
import { ProviderService, BackendProvider } from "@/services/providerService";
import { Loader2 } from "lucide-react";

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("rating");

  // Fetch providers from backend based on filter state
  // Results are already aligned with the Provider interface
  const { data: providers = [], isLoading } = useQuery<
    BackendProvider[],
    Error,
    Provider[]
  >({
    queryKey: ["providers", searchQuery, category, sortBy],
    queryFn: () =>
      ProviderService.getProviders({
        search: searchQuery,
        category: category,
        sort: sortBy,
      }),
    select: (data) => data as Provider[], // Type safety cast
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find a Service Provider
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover top-rated professionals for your home and office needs.
            </p>

            <div className="flex flex-col space-y-8">
              <ProviderSearch value={searchQuery} onChange={setSearchQuery} />
              <ProviderFilters
                category={category}
                onCategoryChange={setCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-coral animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">
                Refining your pro search...
              </p>
            </div>
          ) : providers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you are
                looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
