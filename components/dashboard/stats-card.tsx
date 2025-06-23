"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  className,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
              {change && (
                <p
                  className={cn(
                    "text-xs mt-1",
                    change.type === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {change.type === "increase" ? "↑" : "↓"} {Math.abs(change.value)}%
                </p>
              )}
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}