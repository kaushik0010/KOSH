'use client'

import { useEffect, useState } from "react"
import { WalletTopUp, walletTopUpColumns } from "./wallet-topup-table/columns"
import axios from "axios";
import { DataTable } from "./individual-savings-table/data-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_LIMIT = 5;

const WalletHistory = () => {
  const [topups, setTopups] = useState<WalletTopUp[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTopups = async (page=1) => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/wallet/topups?page=${page}&limit=${PAGE_LIMIT}`);
      setTopups(res.data.topups || []);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error("Failed to fetch wallet top-ups", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopups(currentPage)
  }, [currentPage]);


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Wallet Top-Up History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : topups.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No top-up history found</p>
        ) : (
          <>
            <div className="rounded-md border">
              <DataTable columns={walletTopUpColumns} data={topups} />
            </div>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button
                className="cursor-pointer"
                variant="default"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                className="cursor-pointer"
                variant="default"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default WalletHistory
