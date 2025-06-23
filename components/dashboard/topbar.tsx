"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Menu,
  Bell,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

interface TopbarProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function DashboardTopbar({ sidebarOpen, onSidebarOpenChange }: TopbarProps) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
      sidebarOpen ? "md:ml-64" : "md:ml-20"
    )}>
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onSidebarOpenChange(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <span className="text-sm text-muted-foreground">
              {format(currentDateTime, 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          
          <ModeToggle />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>GM</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">Gym Manager</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="justify-start gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}