interface Member {
    _id: string;
    name: string;
    role: string;
}

interface Criteria {
  minimumWalletBalance?: number;
}

type EditableGroupFields = {
  groupName: string;
  description?: string;
  groupType: string;
  maxGroupSize: number;
  criteria?: {
    minimumWalletBalance?: number;
  };
};

interface Participants {
  _id: string;
  name: string;
}

interface CampaignDetails {
  endDate: Date;
  savingsDay: number;
  participants: Participants[];
  amountPerMonth: number;
  penaltyAmount: number;
  totalSaved: number;
}

interface GroupDetails {
  _id: string;
  groupName: string;
  description: string;
  groupType: string;
  maxGroupSize: number;
  remainingSeats: number;
  admin: {
    _id: string;
  };
  criteria: Criteria;
  members: Member[];
  activeCampaign: {
    _id: string;
    campaignName: string;
    startDate: Date;
    durationInMonths: number;
    status: string;
  }
}

interface PendingRequests {
  _id: string;
  name: string;
}