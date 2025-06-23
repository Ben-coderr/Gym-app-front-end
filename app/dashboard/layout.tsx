"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          sidebarOpen={sidebarOpen}
          onSidebarOpenChange={setSidebarOpen}
        />
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out p-4 md:p-6",
            sidebarOpen ? "md:ml-64" : "md:ml-20"
          )}
        >
          <div className="mx-auto container">{children}</div>
        </main>
      </div>
    </div>
  );
}