import { apiService } from "./apiService";

export interface CreateReviewData {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface Review {
  _id: string;
  customer: {
    _id: string;
    name: string;
  };
  provider: string;
  booking: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const ReviewService = {
  async submitReview(data: CreateReviewData): Promise<Review> {
    const response = await apiService.post("/reviews", data);
    return response.data.data;
  },

  async getProviderReviews(providerId: string): Promise<Review[]> {
    const response = await apiService.get(`/reviews/provider/${providerId}`);
    return response.data.data;
  },
};
