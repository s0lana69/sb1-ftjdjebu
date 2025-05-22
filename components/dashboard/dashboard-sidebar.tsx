"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  LayoutDashboard,
  Settings, 
  BarChart3,
  Wrench,
  Users,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, title, href, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-violet-500/10 hover:text-violet-500",
        isActive ? "bg-violet-500/10 text-violet-500" : "text-muted-foreground",
        isCollapsed && "justify-center py-3"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ isOpen, onToggle }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, title: "Dashboard", href: "/dashboard" },
    { icon: Wrench, title: "Tools", href: "/dashboard/tools" },
    { icon: BarChart3, title: "Analytics", href: "/dashboard/analytics" },
    { icon: Video, title: "Content", href: "/dashboard/content" },
    { icon: Users, title: "Audience", href: "/dashboard/audience" },
    { icon: Settings, title: "Settings", href: "/dashboard/settings" }
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isOpen ? (isCollapsed ? "w-[72px]" : "w-64") : "w-0 -ml-[72px] md:ml-0 md:w-[72px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg viewBox="0 0 90 20" className="h-6 fill-current">
              <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
            </svg>
            <span className="text-lg font-bold">TrueViral</span>
          </Link>
        )}
        {(isOpen && !isCollapsed) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {(isOpen && isCollapsed) && (
          <div className="flex w-full justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCollapsed(false)}
              className="hidden md:flex"
            >
              <svg viewBox="0 0 90 20" className="h-5 w-5 fill-current">
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
              </svg>
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              icon={item.icon} 
              title={item.title} 
              href={item.href} 
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}