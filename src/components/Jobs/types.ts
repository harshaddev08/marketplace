export interface Job {
  id: string;
  customer: string;
  service: string;
  location: string;
  date: string;
  price: string;
  status: "pending" | "active" | "completed";
  description: string;
}
