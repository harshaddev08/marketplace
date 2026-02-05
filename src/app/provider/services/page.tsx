"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceList } from "./components/ServiceList";
import { AddServiceModal } from "./components/AddServiceModal";
import { Service } from "@/services/providerService";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/useServices";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { PrimaryConfirmationDialog } from "@/components/PrimaryConfirmationDialog";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [primaryServiceToConfirm, setPrimaryServiceToConfirm] =
    useState<Service | null>(null);

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteService.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const handleSetPrimary = (service: Service) => {
    if (service.isPrimary) return; // Already primary
    setPrimaryServiceToConfirm(service);
  };

  const handleConfirmSetPrimary = () => {
    if (primaryServiceToConfirm) {
      updateService.mutate(
        {
          id: primaryServiceToConfirm._id,
          updates: { isPrimary: true },
        },
        {
          onSuccess: () => {
            setPrimaryServiceToConfirm(null);
          },
        },
      );
    }
  };

  const handleSaveService = (serviceData: Partial<Service>) => {
    if (editingService) {
      updateService.mutate({ id: editingService?._id, updates: serviceData });
    } else {
      createService.mutate(serviceData as Omit<Service, "id">);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage your service offerings and prices.
          </p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading services...</div>
      ) : (
        <ServiceList
          services={services}
          onEdit={handleEditService}
          onDelete={handleDeleteClick}
          onSetPrimary={handleSetPrimary}
        />
      )}

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        editingService={editingService}
      />

      <DeleteConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      />

      <PrimaryConfirmationDialog
        isOpen={!!primaryServiceToConfirm}
        onClose={() => setPrimaryServiceToConfirm(null)}
        onConfirm={handleConfirmSetPrimary}
        serviceName={primaryServiceToConfirm?.name || ""}
      />
    </div>
  );
}
