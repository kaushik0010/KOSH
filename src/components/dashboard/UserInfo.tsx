'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Edit, Mail, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";


const UserInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/me');
        setUser(response.data);

      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [])

  const handleClick = () => {
    router.push('/profile');
  }

  if (loading) return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle>Loading user info...</CardTitle>
      </CardHeader>
    </Card>
  )

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
      <CardContent className="space-y-4">
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
        <Button 
          onClick={handleClick} 
          className="w-full mt-4 gap-2 cursor-pointer"
          variant="default"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserInfo
