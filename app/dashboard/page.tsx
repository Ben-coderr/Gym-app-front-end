"use client";

import { useState } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AnalyticsCharts } from "@/components/dashboard/analytics/charts";
import { ExpiringSubscriptions } from "@/components/dashboard/expiring-subscriptions";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  AlertTriangle,
  Calendar,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  // Mock data for the dashboard
  const mockActivities = [
    {
      id: "1",
      type: "check-in" as const,
      user: "John Smith",
      action: "Checked in to the gym",
      time: "Just now",
    },
    {
      id: "2",
      type: "booking" as const,
      user: "Emma Watson",
      action: "Booked a Yoga class for tomorrow",
      time: "5 min ago",
    },
    {
      id: "3",
      type: "purchase" as const,
      user: "Michael Brown",
      action: "Purchased 2x Protein Shake",
      time: "10 min ago",
    },
    {
      id: "4",
      type: "check-in" as const,
      user: "Sarah Johnson",
      action: "Checked in to the gym",
      time: "30 min ago",
    },
    {
      id: "5",
      type: "booking" as const,
      user: "David Lee",
      action: "Booked a Personal Training session",
      time: "1 hour ago",
    },
  ];

  const mockSubscriptions = [
    {
      id: "1",
      member: "John Smith",
      plan: "Premium Monthly",
      expiryDate: "Today",
      status: "expiring-today" as const,
    },
    {
      id: "2",
      member: "Emma Watson",
      plan: "Standard Quarterly",
      expiryDate: "Tomorrow",
      status: "expiring-soon" as const,
    },
    {
      id: "3",
      member: "Michael Brown",
      plan: "Basic Monthly",
      expiryDate: "Yesterday",
      status: "expired" as const,
    },
    {
      id: "4",
      member: "Sarah Johnson",
      plan: "Premium Annual",
      expiryDate: "3 days",
      status: "expiring-soon" as const,
    },
  ];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Actions
        </Button>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Active Members"
            value="248"
            icon={Users}
            change={{ value: 12, type: "increase" }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Expiring Today"
            value="5"
            icon={Calendar}
            change={{ value: 2, type: "increase" }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Monthly Revenue"
            value="$12,546"
            icon={DollarSign}
            change={{ value: 8.2, type: "increase" }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Pending Payments"
            value="3"
            icon={AlertTriangle}
            change={{ value: 2, type: "decrease" }}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
        <AnalyticsCharts />
        <div className="col-span-1 grid gap-6 lg:col-span-2">
          <ActivityFeed activities={mockActivities} />
        </div>
      </div>

      <ExpiringSubscriptions subscriptions={mockSubscriptions} />
    </div>
  );
}