import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase } from "lucide-react";
import { ProviderProfileResponse } from "../../types";

interface ProfileInfoCardProps {
  profile: ProviderProfileResponse;
}

export const ProfileInfoCard = ({ profile }: ProfileInfoCardProps) => {
  const { data } = profile;

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-xl">
          <AvatarImage src={data.avatar} alt={data.fullName} />
          <AvatarFallback className="text-2xl">
            {data.fullName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{data.fullName}</h2>
        <p className="text-muted-foreground mb-4">{data.service} Expert</p>

        <div className="w-full space-y-2 mt-4 text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground capitalize">
            <MapPin className="w-4 h-4" />
            {data.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            {data.experience} Experience
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
