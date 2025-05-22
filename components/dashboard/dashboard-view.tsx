"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  DashboardHeader, 
  DashboardShell 
} from "@/components/dashboard/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Overview } from "@/components/dashboard/overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TopPosts } from "@/components/dashboard/top-posts";
import { PlatformMetrics } from "@/components/dashboard/platform-metrics";

export function DashboardView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard":
      case "/dashboard/overview":
        return (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <PlatformMetrics />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Overview className="col-span-4" />
              <TopPosts className="lg:col-span-3" />
            </div>
            <RecentActivity />
          </>
        );
      case "/dashboard/analytics":
        return <h2 className="text-2xl font-bold">Analytics Dashboard</h2>;
      case "/dashboard/content":
        return <h2 className="text-2xl font-bold">Content Management</h2>;
      case "/dashboard/audience":
        return <h2 className="text-2xl font-bold">Audience Insights</h2>;
      case "/dashboard/settings":
        return <h2 className="text-2xl font-bold">Settings</h2>;
      case "/dashboard/profile":
        return <h2 className="text-2xl font-bold">User Profile</h2>;
      default:
        return <h2 className="text-2xl font-bold">Dashboard</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <DashboardShell>
          {renderContent()}
        </DashboardShell>
      </div>
    </div>
  );
}