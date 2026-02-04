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
  date: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface DashboardStats {
  totalEarnings: number;
  activeJobs: number;
  rating: number;
  profileViews: number;
}
