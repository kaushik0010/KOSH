'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ApiResponse } from "@/src/features/auth/types/apiResponse";
import axios, { AxiosError } from "axios";
import { Edit, Loader2, Mail, TrashIcon, User, Wallet } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UserInfo = ({user}: {user: any}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete('/api/user/delete');
      toast.success(res.data.message || "Account deleted successfully");
      signOut({ callbackUrl: "/register", redirect: true });

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'Failed to delete account. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  }

  if (!user) return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Failed to load user data</p>
      </CardContent>
    </Card>
  )

  return (
     <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <User className="w-5 h-5" />
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col h-full">
        <div className="flex-grow space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="font-medium">${user.walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button onClick={() => router.push('/profile')} className="w-full gap-2 cursor-pointer">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full gap-2 cursor-pointer">
                <TrashIcon className="h-4 w-4" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start gap-2">
                <DialogClose asChild>
                  <Button variant="ghost" disabled={isLoading}>Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={isLoading}
                  onClick={handleDeleteAccount}
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
      </CardContent>
    </Card>
  )
}

export default UserInfo
