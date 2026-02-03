// import { apiService } from "./apiService";

export interface CustomerJob {
  id: string;
  provider: string;
  service: string;
  location: string;
  date: string;
  price: string;
  status: "pending" | "active" | "completed" | "cancelled";
  description: string;
}

export const CustomerService = {
  async getJobs(status?: string) {
    // Mocking response for now as backend might not be ready
    // const params = status ? { status } : {};
    // const response = await apiService.get("/customers/jobs", { params });
    // return response.data;

    // Returning mock data
    const mockJobs: CustomerJob[] = [
      {
        id: "c1",
        provider: "John's Cleaning Services",
        service: "House Cleaning",
        location: "Downtown, Apt 4B",
        date: "Today, 2:00 PM",
        price: "$80",
        status: "pending",
        description: "Standard house cleaning for 2 bedroom apartment.",
      },
      {
        id: "c2",
        provider: "Perfect Plumbers",
        service: "Plumbing",
        location: "Downtown, Apt 4B",
        date: "Feb 5, 10:00 AM",
        price: "$120",
        status: "active",
        description: "Fixing kitchen sink dependency.",
      },
      {
        id: "c3",
        provider: "Green Thumb Gardening",
        service: "Garden Maintenance",
        location: "Downtown, Apt 4B",
        date: "Jan 28, 4:00 PM",
        price: "$150",
        status: "completed",
        description: "Monthly lawn care and pruning.",
      },
      {
        id: "c4",
        provider: "Sparky Electricals",
        service: "Electrical Repair",
        location: "Downtown, Apt 4B",
        date: "Jan 20, 11:00 AM",
        price: "$90",
        status: "cancelled",
        description: "Checking circuit breaker issues.",
      },
    ];

    return mockJobs.filter(
      (job) => !status || job.status === status || status === "all",
    );
  },

  async cancelJob(jobId: string) {
    // const response = await apiService.patch(`/customers/jobs/${jobId}/cancel`);
    // return response.data;
    console.log(`Cancelled job ${jobId}`);
    return { success: true };
  },
};
