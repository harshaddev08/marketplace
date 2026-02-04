import { ProviderApplicationData } from "@/services/providerService";

export interface ProviderProfile extends ProviderApplicationData {
  avatar?: string;
  bio?: string;
}

export interface ProviderProfileResponse {
  data: ProviderProfile;
}
