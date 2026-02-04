// import { apiService } from "./apiService";

export interface CustomerJob {
  id: string;
  provider: string;
  service: string;
  location: string;
  date: string;
  price: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  description: string;
  isReviewed?: boolean;
}

export const CustomerService = {
  // Methods related to specific customer actions can land here
  // Currently getMyBookings is handled by BookingService
};
