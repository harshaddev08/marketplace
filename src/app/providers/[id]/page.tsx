"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header, Footer, ProviderDetails, Provider } from "@/components";
import Link from "next/link";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { ProviderService, BackendProvider } from "@/services/providerService";
import { Button } from "@/components/ui";

export default function ProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    data: provider,
    isLoading,
    isError,
  } = useQuery<BackendProvider, Error, Provider>({
    queryKey: ["provider", id],
    queryFn: () => ProviderService.getProviderById(id),
    enabled: !!id,
    select: (data) => data as Provider, // Aligned server-side data
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/providers"
              className="inline-flex items-center text-muted-foreground hover:text-coral transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Providers
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-coral animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">
                Loading profile details...
              </p>
            </div>
          ) : isError || !provider ? (
            <div className="text-center py-20 glass-card max-w-2xl mx-auto">
              <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-destructive">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Provider Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The service provider you are looking for might have moved or is
                no longer available.
              </p>
              <Link href="/providers">
                <Button
                  variant="coral"
                  className="rounded-xl px-8 h-12 font-bold"
                >
                  Browse Other Providers
                </Button>
              </Link>
            </div>
          ) : (
            <ProviderDetails provider={provider} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
