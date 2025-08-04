'use client'

import {z} from "zod"
import { individualSavingsSchema } from "../../schema/individualSavingsSchema"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { ApiResponse } from "@/src/features/auth/types/apiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Loader2, Target } from "lucide-react"
import { Slider } from "@/components/ui/slider"

type FormData = z.infer<typeof individualSavingsSchema>

const CampaignForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(individualSavingsSchema),
        defaultValues: {
            campaignName: "",
            amountPerMonth: 100,
            duration: 3
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/savings/individual/create', data);
            toast.success(response.data.message || 'Savings campaign started successfully!');
            router.replace('/dashboard');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message || 'Failed to create savings campaign. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="border-b">
                    <div className="flex items-center space-x-3">
                        <Target className="h-6 w-6 text-primary" />
                        <div>
                            <CardTitle className="text-2xl font-bold">Create Savings Plan</CardTitle>
                            <p className="text-sm text-muted-foreground">Set up your personal savings goal</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Campaign Name */}
                            <FormField
                                control={form.control}
                                name="campaignName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            <Target className="h-4 w-4 mr-2" />
                                            Goal Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text" 
                                                placeholder="e.g., Vacation Fund, New Car Savings" 
                                                {...field} 
                                                className="h-10"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Give your savings goal a descriptive name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Monthly Amount */}
                            <FormField
                                control={form.control}
                                name="amountPerMonth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            <DollarSign className="h-4 w-4 mr-2" />
                                            Monthly Amount
                                        </FormLabel>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <Input 
                                                type="number" 
                                                placeholder="100" 
                                                min="1"
                                                step="1"
                                                {...field} 
                                                className="h-10 pl-8"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Slider
                                                defaultValue={[100]}
                                                min={10}
                                                max={1000}
                                                step={10}
                                                onValueChange={(value) => form.setValue("amountPerMonth", value[0])}
                                                value={[form.watch("amountPerMonth")]}
                                            />
                                        </div>
                                        <FormDescription>
                                            Amount you'll save each month
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Duration */}
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Duration (Months)
                                        </FormLabel>
                                        <Input 
                                            type="number" 
                                            min="1"
                                            max="36"
                                            {...field} 
                                            placeholder="3" 
                                            className="h-10"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                        <div className="mt-2">
                                            <Slider
                                                defaultValue={[3]}
                                                min={1}
                                                max={24}
                                                step={1}
                                                onValueChange={(value) => form.setValue("duration", value[0])}
                                                value={[form.watch("duration")]}
                                            />
                                        </div>
                                        <FormDescription>
                                            How many months you'll save for
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Summary */}
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="font-medium mb-2">Your Savings Plan</h3>
                                <p className="text-sm">
                                    Save <span className="font-semibold">${form.watch("amountPerMonth")}</span> monthly for <span className="font-semibold">{form.watch("duration")} months</span>
                                </p>
                                <p className="text-sm mt-1">
                                    Total goal: <span className="font-semibold">${form.watch("amountPerMonth") * form.watch("duration")}</span>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-10 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Plan...
                                    </>
                                ) : (
                                    'Start Saving'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CampaignForm
