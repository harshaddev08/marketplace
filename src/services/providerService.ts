import { apiService } from "./apiService";

export interface ProviderApplicationData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  experience: string; // handling as string since form input is string, backend might convert
  city: string;
  about: string;
}

export interface BackendProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  experience: number;
  location: string;
  isVerified: boolean;
  avatar?: string;
  services?: Service[];
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isPrimary?: boolean;
}

export const ProviderService = {
  async applyToBecomeProvider(data: ProviderApplicationData) {
    const response = await apiService.post("/providers/apply", data);
    return response.data;
  },

  async createProfile(data: unknown) {
    const response = await apiService.post("/providers/profile", data);
    return response.data;
  },

  async getProfile() {
    const response = await apiService.get("/providers/profile");
    return response.data;
  },

  async updateProfile(data: Partial<ProviderApplicationData>) {
    const response = await apiService.patch("/providers/profile", data);
    return response.data;
  },

  async getSettings() {
    // Mock data
    return {
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    };
  },

  async updateSettings(data: unknown) {
    const response = await apiService.patch("/providers/settings", data);
    return response.data;
  },

  async getJobs(status?: string) {
    // const params = status ? { status } : {};
    // Mocking response for now as backend might not be ready
    // const response = await apiService.get("/providers/jobs", { params });
    // return response.data;

    // Returning mock data
    return [
      {
        id: "1",
        customer: "Alice Smith",
        service: "House Cleaning",
        location: "Downtown, Apt 4B",
        date: "Today, 2:00 PM",
        price: "$80",
        status: "pending",
        description: "Need deep cleaning for a 2 bedroom apartment.",
      },
      {
        id: "2",
        customer: "John Miller",
        service: "Deep Cleaning",
        location: "Westside, House 12",
        date: "Tomorrow, 10:00 AM",
        price: "$150",
        status: "confirmed",
        description: "Post-construction cleaning required.",
      },
      {
        id: "3",
        customer: "Emily Davis",
        service: "Plumbing",
        location: "North Hills, 56",
        date: "Yesterday, 4:00 PM",
        price: "$120",
        status: "completed",
        description: "Fixed leaking faucet.",
      },
    ].filter((job) => !status || job.status === status || status === "all");
  },

  async updateJobStatus(jobId: string, status: string) {
    const response = await apiService.patch(`/providers/jobs/${jobId}/status`, {
      status,
    });
    return response.data;
  },

  async getEarningsStats() {
    // Mock data
    return {
      totalEarnings: 1250,
      pendingPayout: 320,
      completedJobs: 15,
      chartData: [
        { month: "Jan", earnings: 400 },
        { month: "Feb", earnings: 300 },
        { month: "Mar", earnings: 550 },
        { month: "Apr", earnings: 450 },
        { month: "May", earnings: 600 },
        { month: "Jun", earnings: 750 },
      ],
    };
  },

  async getTransactions() {
    // Mock data
    return [
      {
        id: "t1",
        date: "2024-06-15",
        amount: 80,
        status: "paid",
        description: "House Cleaning - Alice Smith",
      },
      {
        id: "t2",
        date: "2024-06-12",
        amount: 150,
        status: "paid",
        description: "Deep Cleaning - John Miller",
      },
      {
        id: "t3",
        date: "2024-06-01",
        amount: 120,
        status: "pending",
        description: "Plumbing - Emily Davis",
      },
    ];
  },

  async getDashboardStats() {
    const response = await apiService.get("/providers/dashboard/stats");
    return response.data;
  },

  async getJobRequests() {
    const response = await apiService.get("/providers/jobs/requests");
    return response.data;
  },

  async getUpcomingJobs() {
    const response = await apiService.get("/providers/jobs/upcoming");
    return response.data;
  },

  async getProviders(
    filters: Record<string, string> = {},
  ): Promise<BackendProvider[]> {
    const response = await apiService.get("/providers", { params: filters });
    return response.data.data;
  },

  async getProviderById(id: string): Promise<BackendProvider> {
    const response = await apiService.get(`/providers/${id}`);
    return response.data.data;
  },

  // Service Management
  async getServices(): Promise<Service[]> {
    const response = await apiService.get("/services");
    return response.data.data;
  },

  async addService(service: Omit<Service, "id">): Promise<Service> {
    const response = await apiService.post("/services", service);
    return response.data.data;
  },

  async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    const response = await apiService.patch(`/services/${id}`, updates);
    return response.data.data;
  },

  async deleteService(id: string): Promise<void> {
    await apiService.delete(`/services/${id}`);
  },
};
