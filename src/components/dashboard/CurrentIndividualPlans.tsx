'use client'

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { DataTable } from "./individual-savings-table/data-table";
import { columns } from "./individual-savings-table/columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApiResponse } from "@/src/features/auth/types/apiResponse";
import { DollarSign, Loader2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const CurrentIndividualPlans = ({ initialCampaign }: { initialCampaign: Campaign | null }) => {
  const [campaign, setCampaign] = useState(initialCampaign);
  const [isLoading, setIsLoading] = useState(false);
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [collectDialogOpen, setCollectDialogOpen] = useState(false);

  const router = useRouter();

  const individualSavingsId = campaign?._id as Campaign["_id"];
  const amountToPay = campaign?.amountPerMonth as Campaign["amountPerMonth"];

  const today = new Date();
  const PlanEndDate = campaign?.endDate;
  const isPlanEnded = PlanEndDate ? today > new Date(PlanEndDate) : false;

  const progress = campaign ? Math.min(100, (campaign.amountSaved / campaign.totalAmount) * 100) : 0;

  const handleIndividualPay = async(savingId: string, amountPaid: number) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/savings/individual/${savingId}/contribute`, {
        amountPaid
      });
      toast.success(response.data.message || "Monthly amount paid successfully");
      router.refresh();

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'Failed to pay, please try again!';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setPayDialogOpen(false);
    }
  }

  const handleIndividualPayout = async(savingId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/savings/individual/${savingId}/payout`);
      toast.success(response.data.message || "Payout successful");
      router.refresh();

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'Failed to credit savings to your account, please try again!';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setCollectDialogOpen(false);
    }
  }

  if(!campaign) return (
    <Card>
      <CardHeader>
        <CardTitle>Individual Savings Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No active saving plans</p>
      </CardContent>
    </Card>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Your Active Saving Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border mb-6">
          <DataTable columns={columns} data={[campaign]} />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Saved: ${campaign.amountSaved.toFixed(2)}
            </span>
            <span className="text-muted-foreground">
              Target: ${campaign.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Pay Monthly Button */}
          <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="w-full gap-2 cursor-pointer"
              >
                <DollarSign className="h-4 w-4" />
                Pay Monthly Amount (${amountToPay})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Confirm Payment</DialogTitle>
                <DialogDescription className="text-gray-600">
                  You are about to add ${amountToPay} to your savings plan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start gap-2">
                <DialogClose asChild>
                  <Button variant="default" className="cursor-pointer" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="cursor-pointer"
                  disabled={isLoading}
                  onClick={() => handleIndividualPay(individualSavingsId, amountToPay)}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Collect Savings Button */}
          <Dialog open={collectDialogOpen} onOpenChange={setCollectDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="success"
                className="w-full gap-2 cursor-pointer"
                disabled={!isPlanEnded}
              >
                <DollarSign className="h-4 w-4" />
                Collect Savings (${campaign.amountSaved.toFixed(2)})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Confirm Collection</DialogTitle>
                <DialogDescription className="text-gray-600">
                  {isPlanEnded ? (
                    `Your total savings of $${campaign.amountSaved.toFixed(2)} will be credited to your account.`
                  ) : (
                    `Your savings plan ends on ${format(new Date(campaign.endDate), 'PPP')}. You can only collect after the end date.`
                  )}
                </DialogDescription>
              </DialogHeader>
              {isPlanEnded && (
                <DialogFooter className="sm:justify-start gap-2">
                  <DialogClose asChild>
                    <Button className="cursor-pointer" variant="default" disabled={isLoading}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="cursor-pointer"
                    variant="success"
                    disabled={isLoading}
                    onClick={() => handleIndividualPayout(individualSavingsId)}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Confirm Collection"
                    )}
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentIndividualPlans
