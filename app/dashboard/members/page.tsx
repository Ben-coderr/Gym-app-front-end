"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  History,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Calendar,
  DollarSign,
  Phone
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function MembersPage() {
  // Mock member data
  const members = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      plan: "Premium Monthly",
      planPrice: 79.99,
      expiryDate: "May 15, 2025",
      joinDate: "Jan 15, 2024",
      status: "active",
    },
    {
      id: "2",
      name: "Emma Watson",
      email: "emma.watson@example.com",
      phone: "+1 (555) 234-5678",
      plan: "Standard Quarterly",
      planPrice: 199.99,
      expiryDate: "Aug 22, 2025",
      joinDate: "Feb 10, 2024",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      plan: "Basic Monthly",
      planPrice: 29.99,
      expiryDate: "Apr 30, 2025",
      joinDate: "Mar 5, 2024",
      status: "expired",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 456-7890",
      plan: "Premium Annual",
      planPrice: 899.99,
      expiryDate: "Mar 12, 2026",
      joinDate: "Mar 12, 2024",
      status: "active",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 567-8901",
      plan: "Standard Monthly",
      planPrice: 49.99,
      expiryDate: "May 5, 2025",
      joinDate: "Apr 1, 2024",
      status: "pending",
    },
    {
      id: "6",
      name: "Lisa Chen",
      email: "lisa.chen@example.com",
      phone: "+1 (555) 678-9012",
      plan: "Premium Monthly",
      planPrice: 79.99,
      expiryDate: "Jun 10, 2025",
      joinDate: "Dec 20, 2023",
      status: "active",
    },
    {
      id: "7",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "+1 (555) 789-0123",
      plan: "Basic Monthly",
      planPrice: 29.99,
      expiryDate: "May 20, 2025",
      joinDate: "Jan 8, 2024",
      status: "active",
    },
    {
      id: "8",
      name: "Jennifer Davis",
      email: "jennifer.davis@example.com",
      phone: "+1 (555) 890-1234",
      plan: "Standard Quarterly",
      planPrice: 199.99,
      expiryDate: "Jul 15, 2025",
      joinDate: "Apr 15, 2024",
      status: "active",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const expiredMembers = members.filter(m => m.status === 'expired').length;
  const pendingMembers = members.filter(m => m.status === 'pending').length;
  const monthlyRevenue = members
    .filter(m => m.status === 'active')
    .reduce((sum, member) => {
      // Convert different plan types to monthly equivalent
      if (member.plan.includes('Monthly')) {
        return sum + member.planPrice;
      } else if (member.plan.includes('Quarterly')) {
        return sum + (member.planPrice / 3);
      } else if (member.plan.includes('Annual')) {
        return sum + (member.planPrice / 12);
      }
      return sum;
    }, 0);
  
  const avgMemberValue = activeMembers > 0 ? monthlyRevenue / activeMembers : 0;
  const newMembersThisMonth = members.filter(m => {
    const joinDate = new Date(m.joinDate);
    const currentDate = new Date();
    return joinDate.getMonth() === currentDate.getMonth() && 
           joinDate.getFullYear() === currentDate.getFullYear();
  }).length;

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage gym members, subscriptions, and member analytics</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Members</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{totalMembers}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-2 sm:p-3 dark:bg-blue-900">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Members</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{activeMembers}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-2 sm:p-3 dark:bg-green-900">
                  <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Expired/Pending</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{expiredMembers + pendingMembers}</h3>
                </div>
                <div className="rounded-full bg-red-100 p-2 sm:p-3 dark:bg-red-900">
                  <UserX className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Monthly Revenue</p>
                  <h3 className="text-xl sm:text-2xl font-bold">${monthlyRevenue.toFixed(0)}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-2 sm:p-3 dark:bg-green-900">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Avg. Member Value</p>
                  <h3 className="text-xl sm:text-2xl font-bold">${avgMemberValue.toFixed(0)}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-2 sm:p-3 dark:bg-purple-900">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">New This Month</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{newMembersThisMonth}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-2 sm:p-3 dark:bg-orange-900">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Member Management</CardTitle>
          <CardDescription>
            View and manage all gym members, their subscriptions, and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">Export</Button>
              <Button variant="outline" className="flex-1 sm:flex-none">Filter</Button>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{member.phone}</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <History className="h-4 w-4" />
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan:</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{member.plan}</div>
                      <div className="text-xs text-muted-foreground">${member.planPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="text-sm">{member.expiryDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    {getStatusBadge(member.status)}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead className="hidden lg:table-cell">Phone</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead className="hidden xl:table-cell">Join Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                          <p className="text-xs text-muted-foreground lg:hidden">{member.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{member.phone}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.plan}</div>
                        <div className="text-sm text-muted-foreground">${member.planPrice}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">{member.joinDate}</TableCell>
                    <TableCell>{member.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell className="text-right">
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
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <History className="h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}