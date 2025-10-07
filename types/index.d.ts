interface Campaign {
  _id: string;
  campaignName: string;
  amountPerMonth: number;
  totalAmount: number;
  amountSaved: number;
  startDate: string;
  endDate: string;
}


interface WalletTopUp {
    amount: number;
    status: "success" | "failed";
    date: string;
}

interface WalletHistoryProps {
  initialTopups: WalletTopUp[];
  initialTotalPages: number;
}