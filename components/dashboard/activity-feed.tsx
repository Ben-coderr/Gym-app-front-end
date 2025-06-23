"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Calendar,
  ShoppingCart,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ActivityType = "check-in" | "booking" | "purchase";

interface Activity {
  id: string;
  type: ActivityType;
  user: string;
  action: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getIcon = (type: ActivityType) => {
    switch (type) {
      case "check-in":
        return CheckCircle2;
      case "booking":
        return Calendar;
      case "purchase":
        return ShoppingCart;
      default:
        return User;
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
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.ul 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            
            return (
              <motion.li 
                key={activity.id}
                className="flex items-start gap-3"
                variants={item}
              >
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {activity.time}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </CardContent>
    </Card>
  );
}