"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  CreditCard,
  Calendar,
  Package,
  Settings,
  Send,
  Eye,
  Trash2,
  Filter,
  Mail,
  MessageSquare,
  Phone
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  category: "membership" | "payment" | "class" | "system" | "inventory" | "general";
  priority: "low" | "medium" | "high" | "urgent";
  read: boolean;
  date: Date;
  actionRequired?: boolean;
  relatedEntity?: {
    type: "member" | "payment" | "class" | "product";
    id: string;
    name: string;
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: "email" | "sms" | "push";
  category: string;
  active: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Membership Expiring Soon",
      message: "John Smith's Premium Monthly subscription expires in 3 days",
      type: "warning",
      category: "membership",
      priority: "high",
      read: false,
      date: new Date("2025-01-15T10:30:00"),
      actionRequired: true,
      relatedEntity: {
        type: "member",
        id: "1",
        name: "John Smith"
      }
    },
    {
      id: "2",
      title: "Payment Failed",
      message: "Payment of $79.99 failed for Emma Watson's subscription renewal",
      type: "error",
      category: "payment",
      priority: "urgent",
      read: false,
      date: new Date("2025-01-15T09:15:00"),
      actionRequired: true,
      relatedEntity: {
        type: "payment",
        id: "2",
        name: "Emma Watson"
      }
    },
    {
      id: "3",
      title: "Class Fully Booked",
      message: "Yoga class on Jan 16, 2025 at 9:00 AM is now fully booked",
      type: "info",
      category: "class",
      priority: "medium",
      read: true,
      date: new Date("2025-01-15T08:45:00"),
      relatedEntity: {
        type: "class",
        id: "3",
        name: "Yoga Class"
      }
    },
    {
      id: "4",
      title: "Low Stock Alert",
      message: "Protein Powder inventory is running low (5 units remaining)",
      type: "warning",
      category: "inventory",
      priority: "medium",
      read: false,
      date: new Date("2025-01-14T16:20:00"),
      actionRequired: true,
      relatedEntity: {
        type: "product",
        id: "4",
        name: "Protein Powder"
      }
    },
    {
      id: "5",
      title: "New Member Registration",
      message: "Sarah Johnson has successfully registered for Premium Annual plan",
      type: "success",
      category: "membership",
      priority: "low",
      read: true,
      date: new Date("2025-01-14T14:30:00"),
      relatedEntity: {
        type: "member",
        id: "5",
        name: "Sarah Johnson"
      }
    },
    {
      id: "6",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance on Jan 20, 2025 from 2:00 AM to 4:00 AM",
      type: "info",
      category: "system",
      priority: "medium",
      read: false,
      date: new Date("2025-01-14T12:00:00"),
    },
    {
      id: "7",
      title: "Payment Received",
      message: "Payment of $199.99 received from Michael Brown for Quarterly subscription",
      type: "success",
      category: "payment",
      priority: "low",
      read: true,
      date: new Date("2025-01-14T10:15:00"),
      relatedEntity: {
        type: "payment",
        id: "7",
        name: "Michael Brown"
      }
    },
    {
      id: "8",
      title: "Class Cancelled",
      message: "HIIT class on Jan 15, 2025 at 6:00 PM has been cancelled due to trainer unavailability",
      type: "warning",
      category: "class",
      priority: "high",
      read: false,
      date: new Date("2025-01-13T18:30:00"),
      actionRequired: true,
      relatedEntity: {
        type: "class",
        id: "8",
        name: "HIIT Class"
      }
    },
  ]);

  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: "1",
      name: "Membership Expiry Reminder",
      subject: "Your membership expires soon",
      content: "Hi {member_name}, your {plan_name} membership expires on {expiry_date}. Please renew to continue enjoying our services.",
      type: "email",
      category: "membership",
      active: true,
    },
    {
      id: "2",
      name: "Payment Failed Alert",
      subject: "Payment failed - Action required",
      content: "We couldn't process your payment of ${amount}. Please update your payment method to avoid service interruption.",
      type: "email",
      category: "payment",
      active: true,
    },
    {
      id: "3",
      name: "Class Booking Confirmation",
      subject: "Class booking confirmed",
      content: "Your booking for {class_name} on {date} at {time} has been confirmed. See you there!",
      type: "sms",
      category: "class",
      active: true,
    },
    {
      id: "4",
      name: "Welcome New Member",
      subject: "Welcome to FitLife Gym!",
      content: "Welcome {member_name}! We're excited to have you join our fitness community. Your {plan_name} membership is now active.",
      type: "email",
      category: "membership",
      active: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    category: "general" as const,
    priority: "medium" as const,
    recipients: "all" as const,
  });

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter;
    const matchesRead = readFilter === "all" || 
      (readFilter === "read" && notification.read) ||
      (readFilter === "unread" && !notification.read);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesRead;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge variant="secondary">High</Badge>;
      case "medium":
        return <Badge variant="outline">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: Notification["category"]) => {
    switch (category) {
      case "membership":
        return <Users className="h-4 w-4" />;
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "class":
        return <Calendar className="h-4 w-4" />;
      case "inventory":
        return <Package className="h-4 w-4" />;
      case "system":
        return <Settings className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage notifications and communication templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Notification</DialogTitle>
                <DialogDescription>
                  Send a notification to your members
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="Notification title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    placeholder="Notification message"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification({...newNotification, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={newNotification.priority} onValueChange={(value: any) => setNewNotification({...newNotification, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Select value={newNotification.recipients} onValueChange={(value: any) => setNewNotification({...newNotification, recipients: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Members</SelectItem>
                      <SelectItem value="active">Active Members</SelectItem>
                      <SelectItem value="expired">Expired Members</SelectItem>
                      <SelectItem value="premium">Premium Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <h3 className="text-2xl font-bold">{unreadCount}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Urgent</p>
                  <h3 className="text-2xl font-bold">{urgentCount}</h3>
                </div>
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                  <h3 className="text-2xl font-bold">{actionRequiredCount}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <h3 className="text-2xl font-bold">{notifications.length}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                View and manage all system notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search notifications..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="membership">Membership</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={readFilter} onValueChange={setReadFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                      !notification.read ? 'bg-muted/30 border-primary/20' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {getCategoryIcon(notification.category)}
                            <span className="capitalize">{notification.category}</span>
                            <span>•</span>
                            <span>{format(notification.date, 'MMM d, yyyy HH:mm')}</span>
                            {notification.actionRequired && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">Action Required</Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {getPriorityBadge(notification.priority)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!notification.read && (
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="h-4 w-4" />
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Manage automated notification templates for different events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant={template.type === 'email' ? 'default' : template.type === 'sms' ? 'secondary' : 'outline'}>
                            {template.type === 'email' && <Mail className="h-3 w-3 mr-1" />}
                            {template.type === 'sms' && <Phone className="h-3 w-3 mr-1" />}
                            {template.type === 'push' && <Bell className="h-3 w-3 mr-1" />}
                            {template.type.toUpperCase()}
                          </Badge>
                          <Badge variant={template.active ? 'default' : 'secondary'}>
                            {template.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Subject: {template.subject}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {template.content.substring(0, 100)}...
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Send className="h-4 w-4" />
                            Test Send
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}