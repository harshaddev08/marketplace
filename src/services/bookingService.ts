import { apiService } from "./apiService";
import { CustomerJob } from "./customerService";
import { Job as ProviderJob } from "@/components/Jobs/types";

export interface CreateBookingData {
  providerId: string;
  serviceId?: string;
  service: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  price: number;
}

export interface Booking {
  _id: string;
  provider: {
    _id: string;
    user: {
      name: string;
    };
    category: string;
    location: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
  };
  service: string;
  date: string;
  time: string;
  location: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export const BookingService = {
  async createBooking(data: CreateBookingData) {
    const response = await apiService.post("/bookings", data);
    return response.data.data;
  },

  async getMyBookings(): Promise<CustomerJob[]> {
    const response = await apiService.get("/bookings/my-bookings");
    return response.data.data;
  },

  async getProviderBookings(): Promise<ProviderJob[]> {
    const response = await apiService.get("/bookings/provider-bookings");
    return response.data.data;
  },

  async cancelBooking(id: string) {
    const response = await apiService.patch(`/bookings/${id}/status`, {
      status: "cancelled",
    });
    return response.data.data;
  },

  async updateBookingStatus(id: string, status: string) {
    const response = await apiService.patch(`/bookings/${id}/status`, {
      status,
    });
    return response.data.data;
  },
};
