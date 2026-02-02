export interface Customer {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface Job {
  _id: string;
  customer: Customer;
  service: string;
  description?: string;
  location: string;
  scheduledDate: string;
  price: number;
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
}

export interface DashboardStats {
  totalEarnings: number;
  activeJobs: number;
  rating: number;
  profileViews: number;
}
