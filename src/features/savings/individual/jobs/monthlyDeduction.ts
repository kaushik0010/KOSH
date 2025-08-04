import dbConnect from "@/src/features/auth/lib/dbConnect";
import IndividualSavingModel from "../models/individualSaving.model";
import UserModel from "@/src/features/auth/models/user.model";

export const runMonthlyDeductions = async () => {
  await dbConnect();

  const today = new Date();

  const activeCampaigns = await IndividualSavingModel.find({ isActive: true });

  for (const campaign of activeCampaigns) {
    const { _id, userId, startDate, endDate, amountPerMonth, amountSaved, totalAmount } = campaign;

    // Check if campaign ended
    if (today >= new Date(endDate)) {
      campaign.isActive = false;

      const user = await UserModel.findById(userId);
      if (user) {
        user.walletBalance += campaign.amountSaved;
        await user.save();
        console.log(`✅ Returned $${campaign.amountSaved} to ${user.email}'s wallet.`);
      }

      await campaign.save();
      continue;
    }

    // Check if 30+ days passed since last deduction
    const lastDeduction = new Date(campaign.updatedAt);
    const diffDays = Math.floor((today.getTime() - lastDeduction.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 30) continue;

    const user = await UserModel.findById(userId);
    if (!user || user.walletBalance < amountPerMonth) {
      console.warn(`Skipping deduction for ${user?.email || userId} — insufficient balance`);
      continue;
    }

    // Deduct wallet & update savings
    user.walletBalance -= amountPerMonth;
    await user.save();

    campaign.amountSaved += amountPerMonth;
    await campaign.save();

    console.log(`Deducted $${amountPerMonth} from ${user.email} on ${today.toDateString()}`);
  }
};