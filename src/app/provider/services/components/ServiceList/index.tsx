import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Package } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Service } from "@/services/providerService";

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (_id: string) => void;
  onSetPrimary: (service: Service) => void;
}

export function ServiceList({
  services,
  onEdit,
  onDelete,
  onSetPrimary,
}: ServiceListProps) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="No services added"
        description="You haven't added any services yet. Click the 'Add Service' button above to get started."
        icon={Package}
      />
    );
  }

  return (
    <div className="border rounded-md bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Primary</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service?._id}>
              <TableCell>
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => onSetPrimary(service)}
                  title={
                    service.isPrimary ? "Primary Service" : "Set as Primary"
                  }
                >
                  <div
                    className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center ${service.isPrimary ? "bg-primary" : "bg-transparent"}`}
                  >
                    {service.isPrimary && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>{service.duration} min</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(service)}
                  title="Edit Service"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDelete(service._id)}
                  title="Delete Service"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
