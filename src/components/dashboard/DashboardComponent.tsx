'use client'

import React, { useState } from 'react'
import UserInfo from './UserInfo'
import WalletHistory from './WalletHistory'
import CurrentIndividualPlans from './CurrentIndividualPlans'
import StartIndividualSavingButton from './StartIndividualSavingButton'
import JoinedGroups from './JoinedGroups'
import SavingsHistory from './SavingsHistory'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ApiResponse } from '@/src/features/auth/types/apiResponse'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, TrashIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

const DashboardComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete('/api/user/delete');
      toast.success(res.data.message || "Account deleted successfully");
      setTimeout(() => {
        signOut({ callbackUrl: "/register" });
      }, 1000);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'Failed to delete account. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <div className='flex mx-auto justify-between'>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="gap-2 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4 sm:hidden" />
                <span className="font-medium hidden sm:inline">Delete Account</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Confirm Payment</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Are you sure you want to delete your account? Once your account is deleted, it cannot be recovered.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-between gap-2">
                <DialogClose asChild>
                  <Button variant="default" className="cursor-pointer" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  disabled={isLoading}
                  onClick={() => handleDeleteAccount()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Yes, Delete Account"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Overview of your savings and account activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UserInfo />
            <WalletHistory />
          </div>
          <CurrentIndividualPlans />
        </div>
        
        <div className="space-y-6">
          <StartIndividualSavingButton />
          <JoinedGroups />
          <SavingsHistory />
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent
