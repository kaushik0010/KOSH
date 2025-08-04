import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/src/features/auth/lib/dbConnect";
import IndividualSavingModel from "@/src/features/savings/individual/models/individualSaving.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if(!session?.user?.email) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized'
            }, {status: 401});
        }

        const campaignHistory = await IndividualSavingModel.find({
            userId: session?.user._id,
            isActive: false,
        })
        
        if(!campaignHistory) {
            return NextResponse.json({
                success: false,
                message: 'No history to show yet',
                campaign: []
            }, {status: 200});
        }
        
        return NextResponse.json({ 
            success: true,
            message: "Savings history successfully",
            campaign: campaignHistory 
        }, {status: 200});

    } catch (error) {
        return NextResponse.json({ 
            success: false,
            message: "Internal server error" 
        }, {status: 500});
    }
}