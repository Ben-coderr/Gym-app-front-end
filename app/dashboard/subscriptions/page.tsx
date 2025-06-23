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
  Plus, 
  Search,
  Edit,
  Trash2,
  Star,
  MoreHorizontal,
  DollarSign,
  Users,
  Calendar,
  TrendingUp
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

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular: boolean;
  status: "active" | "inactive";
  subscribers: number;
  revenue: number;
}

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Basic Monthly",
      price: 29.99,
      duration: "Monthly",
      features: ["Gym access", "Basic equipment", "Locker access"],
      isPopular: false,
      status: "active",
      subscribers: 45,
      revenue: 1349.55,
    },
    {
      id: "2",
      name: "Premium Quarterly",
      price: 79.99,
      duration: "Quarterly",
      features: ["Gym access", "All equipment", "2 PT sessions", "Group classes"],
      isPopular: true,
      status: "active",
      subscribers: 78,
      revenue: 6239.22,
    },
    {
      id: "3",
      name: "Elite Annual",
      price: 299.99,
      duration: "Annual",
      features: ["24/7 access", "All facilities", "12 PT sessions", "Nutrition plan", "Priority booking"],
      isPopular: false,
      status: "active",
      subscribers: 23,
      revenue: 6899.77,
    },
    {
      id: "4",
      name: "Student Monthly",
      price: 19.99,
      duration: "Monthly",
      features: ["Gym access", "Basic equipment", "Student discount"],
      isPopular: false,
      status: "active",
      subscribers: 32,
      revenue: 639.68,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    isPopular: false,
  });

  const handleAddPlan = () => {
    const plan: Plan = {
      id: (plans.length + 1).toString(),
      name: newPlan.name,
      price: parseFloat(newPlan.price),
      duration: newPlan.duration,
      features: newPlan.features.split(",").map(f => f.trim()),
      isPopular: newPlan.isPopular,
      status: "active",
      subscribers: 0,
      revenue: 0,
    };
    
    setPlans([...plans, plan]);
    setIsAddDialogOpen(false);
    setNewPlan({ name: "", price: "", duration: "", features: "", isPopular: false });
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      price: plan.price.toString(),
      duration: plan.duration,
      features: plan.features.join(", "),
      isPopular: plan.isPopular,
    });
  };

  const handleUpdatePlan = () => {
    if (!editingPlan) return;
    
    const updatedPlans = plans.map(plan => 
      plan.id === editingPlan.id 
        ? {
            ...plan,
            name: newPlan.name,
            price: parseFloat(newPlan.price),
            duration: newPlan.duration,
            features: newPlan.features.split(",").map(f => f.trim()),
            isPopular: newPlan.isPopular,
          }
        : plan
    );
    
    setPlans(updatedPlans);
    setEditingPlan(null);
    setNewPlan({ name: "", price: "", duration: "", features: "", isPopular: false });
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribers, 0);

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
          <h1 className="text-2xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage your gym's membership plans and pricing</p>
        </div>
        <Dialog open={isAddDialogOpen || !!editingPlan} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingPlan(null);
            setNewPlan({ name: "", price: "", duration: "", features: "", isPopular: false });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Edit Plan" : "Add New Subscription Plan"}</DialogTitle>
              <DialogDescription>
                {editingPlan ? "Update the membership plan details." : "Create a new membership plan for your gym."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="Premium Monthly"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  placeholder="99.99"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={newPlan.duration} onValueChange={(value) => setNewPlan({ ...newPlan, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  placeholder="Gym access, PT sessions, Group classes"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={newPlan.isPopular}
                  onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="popular">Mark as popular plan</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setEditingPlan(null);
                setNewPlan({ name: "", price: "", duration: "", features: "", isPopular: false });
              }}>
                Cancel
              </Button>
              <Button onClick={editingPlan ? handleUpdatePlan : handleAddPlan}>
                {editingPlan ? "Update Plan" : "Add Plan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                  <p className="text-sm text-muted-foreground">Active Plans</p>
                  <h3 className="text-2xl font-bold">{plans.filter(p => p.status === 'active').length}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                  <p className="text-sm text-muted-foreground">Total Subscribers</p>
                  <h3 className="text-2xl font-bold">{totalSubscribers}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
                  <p className="text-sm text-muted-foreground">Avg. Revenue/Plan</p>
                  <h3 className="text-2xl font-bold">${(totalRevenue / plans.length).toFixed(0)}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
          <CardDescription>
            View and manage your gym's subscription plans and their performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search plans..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Export</Button>
              <Button variant="outline">Filter</Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="hidden md:table-cell">Features</TableHead>
                  <TableHead className="hidden lg:table-cell">Subscribers</TableHead>
                  <TableHead className="hidden lg:table-cell">Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          {plan.isPopular && (
                            <Badge variant="secondary" className="gap-1 mt-1">
                              <Star className="h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${plan.price}</TableCell>
                    <TableCell>{plan.duration}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="max-w-xs">
                        {plan.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {feature}
                          </div>
                        ))}
                        {plan.features.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{plan.features.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{plan.subscribers}</TableCell>
                    <TableCell className="hidden lg:table-cell">${plan.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={plan.status === "active" ? "default" : "secondary"}
                      >
                        {plan.status}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleEditPlan(plan)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleDeletePlan(plan.id)}
                          >
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