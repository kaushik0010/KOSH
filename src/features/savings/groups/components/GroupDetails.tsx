'use client'

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GroupSidebarComponent from "./GroupSidebarComponent";
import GroupHeaderComponent from "./GroupHeaderComponent";
import GroupMainSectionComponent from "./GroupMainSectionComponent";


const GroupDetailsComponent = () => {
  const params = useParams();
  const groupId = params.groupId as string;

  const [groupDetails, setGroupDetails] = useState<GroupDetails | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/savings/group/${groupId}/details`);
        setGroupDetails(res.data)
      } catch (error) {
        toast.error("Failed to fetch group details")
      } finally {
        setIsLoading(false);
      }
    }

    const fetchPendingRequests = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/savings/group/${groupId}/pending-requests`);
        setPendingMembers(res.data.pendingMembers);
      } catch (error:any) {
        console.log("Failed to fetch pending requests");
      } finally {
        setIsLoading(false);
      }
    }

    if(groupId) {
      fetchGroupDetails();
      fetchPendingRequests();
    }
  }, [groupId]);

  if(isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if(!groupDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Group not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <GroupSidebarComponent 
        members={groupDetails.members} 
        pendingRequests={pendingMembers}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        group={groupDetails}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <GroupHeaderComponent 
          group={groupDetails} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <GroupMainSectionComponent group={groupDetails} />
      </div>
    </div>
  )
}

export default GroupDetailsComponent
