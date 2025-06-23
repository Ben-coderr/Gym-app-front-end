"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Users, 
  Clock, 
  UserRound 
} from "lucide-react";
import { format } from "date-fns";

interface ClassEvent {
  id: string;
  title: string;
  trainer: string;
  time: string;
  capacity: number;
  booked: number;
  status: "available" | "filling" | "full";
}

export default function ClassesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock class data
  const classEvents: Record<string, ClassEvent[]> = {
    "2025-05-01": [
      {
        id: "1",
        title: "Yoga",
        trainer: "Sarah J.",
        time: "9:00 AM - 10:00 AM",
        capacity: 20,
        booked: 12,
        status: "available",
      },
      {
        id: "2",
        title: "HIIT",
        trainer: "Mike T.",
        time: "5:30 PM - 6:30 PM",
        capacity: 15,
        booked: 14,
        status: "filling",
      },
    ],
    "2025-05-02": [
      {
        id: "3",
        title: "Spin Class",
        trainer: "Emma W.",
        time: "6:00 AM - 7:00 AM",
        capacity: 12,
        booked: 12,
        status: "full",
      },
      {
        id: "4",
        title: "Pilates",
        trainer: "John S.",
        time: "11:00 AM - 12:00 PM",
        capacity: 15,
        booked: 8,
        status: "available",
      },
    ],
  };

  const getStatusBadge = (status: ClassEvent["status"]) => {
    switch (status) {
      case "available":
        return <Badge variant="outline">Available</Badge>;
      case "filling":
        return <Badge variant="secondary">Filling Up</Badge>;
      case "full":
        return <Badge variant="destructive">Full</Badge>;
      default:
        return null;
    }
  };

  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  const classesForDay = classEvents[formattedDate] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Class Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={{ before: new Date() }}
              modifiers={{
                booked: Object.keys(classEvents).map(day => new Date(day)),
              }}
              modifiersStyles={{
                booked: { 
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                `Classes for ${format(date, "MMMM d, yyyy")}`
              ) : (
                "Select a Date"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {classesForDay.length > 0 ? (
              <div className="space-y-4">
                {classesForDay.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "rounded-lg border p-4 transition-all hover:shadow-md",
                      event.status === "full" && "opacity-75"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      {getStatusBadge(event.status)}
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        <span>{event.trainer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.booked}/{event.capacity} Booked</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">View Bookings</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">
                  No classes scheduled for this day.
                  <br />
                  <Button variant="link" className="h-auto p-0">
                    Create a new class
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}