import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProviderService, Service } from "@/services/providerService";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on package.json

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: ProviderService.getServices,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newService: Omit<Service, "id">) =>
      ProviderService.addService(newService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create service");
      console.error(error);
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Service> }) =>
      ProviderService.updateService(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update service");
      console.error(error);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProviderService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete service");
      console.error(error);
    },
  });
}
