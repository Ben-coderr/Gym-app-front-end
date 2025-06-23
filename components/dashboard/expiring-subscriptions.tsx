"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Subscription {
  id: string;
  member: string;
  plan: string;
  expiryDate: string;
  status: "expiring-today" | "expiring-soon" | "expired";
}

interface ExpiringSubscriptionsProps {
  subscriptions: Subscription[];
  className?: string;
}

export function ExpiringSubscriptions({ subscriptions, className }: ExpiringSubscriptionsProps) {
  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "expiring-today":
        return <Badge variant="secondary">Today</Badge>;
      case "expiring-soon":
        return <Badge variant="outline">Soon</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Expiring Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {subscriptions.map((subscription) => (
                <motion.tr key={subscription.id} variants={item}>
                  <TableCell className="font-medium">{subscription.member}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>{subscription.expiryDate}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Renew</Button>
                  </TableCell>
                </motion.tr>
              ))}
            </motion.tbody>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}