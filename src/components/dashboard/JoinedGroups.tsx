'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface GroupsList {
  _id: string;
  groupId: {
    _id: string;
    groupName: string;
  }
}

const JoinedGroups = () => {
  const [groups, setGroups] = useState<GroupsList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchUserGroups = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('/api/user/groups');
      setGroups(response.data.groups || [])
    } catch (error) {
      console.error("Error loading your joined groups", error);
      setError("Failed to load your groups");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserGroups()
  }, [])


  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <Users className="h-5 w-5" />
          Joined Savings Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-9 w-16 rounded-md" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[150px] text-center">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={fetchUserGroups}
              className='cursor-pointer'
              size="sm"
            >
              Retry
            </Button>
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[150px] text-center">
            <p className="text-muted-foreground">
              You haven't joined any savings groups yet
            </p>
            <Button asChild size="sm">
              <Link href="/groups">
                Browse Groups
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group) => (
              <div 
                key={group._id} 
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="font-medium">{group.groupId.groupName}</span>
                <Button 
                  size="sm"
                  className='cursor-pointer'
                  onClick={() => router.push(`/groups/${group.groupId._id}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default JoinedGroups
