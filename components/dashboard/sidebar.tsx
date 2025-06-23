"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Calendar, 
  CreditCard, 
  Dumbbell, 
  Home, 
  LayoutDashboard, 
  Package, 
  Settings, 
  ShoppingCart, 
  Users, 
  Bell,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DashboardSidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Members",
      href: "/dashboard/members",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Classes",
      href: "/dashboard/classes",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Workouts",
      href: "/dashboard/workouts",
      icon: <Target className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full border-r bg-background transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-20"
      )}
      initial={false}
      animate={{ width: open ? 256 : 80 }}
    >
      <div className="flex h-16 items-center justify-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-primary" />
          {open && <span className="text-xl font-bold">FitManager</span>}
        </Link>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              open ? "px-4" : "justify-center px-2"
            )}
            asChild
          >
            <Link href={item.href} className="flex items-center gap-3">
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          </Button>
        ))}
      </div>
    </motion.aside>
  );
}