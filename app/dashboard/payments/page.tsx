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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  Plus,
  MoreHorizontal,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
  Calendar,
  Users,
  Receipt
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

interface Payment {
  id: string;
  transactionId: string;
  member: string;
  memberEmail: string;
  amount: number;
  type: "subscription" | "product" | "class" | "personal_training";
  method: "card" | "cash" | "bank_transfer" | "paypal";
  status: "completed" | "pending" | "failed" | "refunded";
  date: Date;
  description: string;
  fees?: number;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      transactionId: "TXN-2025-001",
      member: "John Smith",
      memberEmail: "john.smith@example.com",
      amount: 79.99,
      type: "subscription",
      method: "card",
      status: "completed",
      date: new Date("2025-01-15T10:30:00"),
      description: "Premium Monthly Subscription",
      fees: 2.40,
    },
    {
      id: "2",
      transactionId: "TXN-2025-002",
      member: "Emma Watson",
      memberEmail: "emma.watson@example.com",
      amount: 199.99,
      type: "subscription",
      method: "bank_transfer",
      status: "completed",
      date: new Date("2025-01-15T14:15:00"),
      description: "Standard Quarterly Subscription",
      fees: 0,
    },
    {
      id: "3",
      transactionId: "TXN-2025-003",
      member: "Michael Brown",
      memberEmail: "michael.brown@example.com",
      amount: 29.99,
      type: "subscription",
      method: "card",
      status: "failed",
      date: new Date("2025-01-15T16:45:00"),
      description: "Basic Monthly Subscription",
      fees: 0.90,
    },
    {
      id: "4",
      transactionId: "TXN-2025-004",
      member: "Sarah Johnson",
      memberEmail: "sarah.johnson@example.com",
      amount: 150.00,
      type: "personal_training",
      method: "cash",
      status: "completed",
      date: new Date("2025-01-14T09:20:00"),
      description: "Personal Training Package (5 sessions)",
      fees: 0,
    },
    {
      id: "5",
      transactionId: "TXN-2025-005",
      member: "David Lee",
      memberEmail: "david.lee@example.com",
      amount: 25.00,
      type: "class",
      method: "paypal",
      status: "completed",
      date: new Date("2025-01-14T11:30:00"),
      description: "Yoga Class Drop-in",
      fees: 1.00,
    },
    {
      id: "6",
      transactionId: "TXN-2025-006",
      member: "Lisa Chen",
      memberEmail: "lisa.chen@example.com",
      amount: 45.99,
      type: "product",
      method: "card",
      status: "pending",
      date: new Date("2025-01-14T15:45:00"),
      description: "Protein Powder + Shaker Bottle",
      fees: 1.38,
    },
    {
      id: "7",
      transactionId: "TXN-2025-007",
      member: "Robert Wilson",
      memberEmail: "robert.wilson@example.com",
      amount: 899.99,
      type: "subscription",
      method: "card",
      status: "completed",
      date: new Date("2025-01-13T08:15:00"),
      description: "Premium Annual Subscription",
      fees: 26.99,
    },
    {
      id: "8",
      transactionId: "TXN-2025-008",
      member: "Jennifer Davis",
      memberEmail: "jennifer.davis@example.com",
      amount: 79.99,
      type: "subscription",
      method: "card",
      status: "refunded",
      date: new Date("2025-01-12T13:20:00"),
      description: "Premium Monthly Subscription (Refunded)",
      fees: -2.40,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.memberEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesType = typeFilter === "all" || payment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="gap-1"><CheckCircle className="h-3 w-3" />Completed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "failed":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Failed</Badge>;
      case "refunded":
        return <Badge variant="outline" className="gap-1"><AlertTriangle className="h-3 w-3" />Refunded</Badge>;
      default:
        return null;
    }
  };

  const getMethodBadge = (method: Payment["method"]) => {
    switch (method) {
      case "card":
        return <Badge variant="outline">Card</Badge>;
      case "cash":
        return <Badge variant="outline">Cash</Badge>;
      case "bank_transfer":
        return <Badge variant="outline">Bank Transfer</Badge>;
      case "paypal":
        return <Badge variant="outline">PayPal</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: Payment["type"]) => {
    switch (type) {
      case "subscription":
        return <Badge variant="secondary">Subscription</Badge>;
      case "product":
        return <Badge variant="secondary">Product</Badge>;
      case "class":
        return <Badge variant="secondary">Class</Badge>;
      case "personal_training":
        return <Badge variant="secondary">PT</Badge>;
      default:
        return null;
    }
  };

  // Calculate stats
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = payments.length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  const totalFees = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + (payment.fees || 0), 0);
  const avgTransactionValue = totalTransactions > 0 ? totalRevenue / payments.filter(p => p.status === 'completed').length : 0;

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
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and manage all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="xl:col-span-2">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-xl sm:text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-2 sm:p-3 dark:bg-green-900">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Transactions</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{totalTransactions}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-2 sm:p-3 dark:bg-blue-900">
                  <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{pendingPayments}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-2 sm:p-3 dark:bg-orange-900">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Failed</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{failedPayments}</h3>
                </div>
                <div className="rounded-full bg-red-100 p-2 sm:p-3 dark:bg-red-900">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Avg. Value</p>
                  <h3 className="text-xl sm:text-2xl font-bold">${avgTransactionValue.toFixed(0)}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-2 sm:p-3 dark:bg-purple-900">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            View and manage all payment transactions and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="personal_training">Personal Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredPayments.map((payment) => (
              <Card key={payment.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium truncate">{payment.member}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">ID: {payment.transactionId}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {getTypeBadge(payment.type)}
                      {getMethodBadge(payment.method)}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg">${payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{format(payment.date, 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.transactionId}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-48">
                          {payment.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.member}</div>
                        <div className="text-sm text-muted-foreground">{payment.memberEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${payment.amount}</div>
                      {payment.fees && payment.fees > 0 && (
                        <div className="text-xs text-muted-foreground">Fee: ${payment.fees}</div>
                      )}
                    </TableCell>
                    <TableCell>{getTypeBadge(payment.type)}</TableCell>
                    <TableCell>{getMethodBadge(payment.method)}</TableCell>
                    <TableCell>{format(payment.date, 'MMM d, yyyy HH:mm')}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                            onClick={() => setViewingPayment(payment)}
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          {payment.status === 'completed' && (
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <AlertTriangle className="h-4 w-4" />
                              Issue Refund
                            </DropdownMenuItem>
                          )}
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

      {/* Payment Details Dialog */}
      <Dialog open={!!viewingPayment} onOpenChange={() => setViewingPayment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details - {viewingPayment?.transactionId}</DialogTitle>
            <DialogDescription>
              Complete transaction information and details
            </DialogDescription>
          </DialogHeader>
          {viewingPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Member</Label>
                  <p className="text-sm text-muted-foreground">{viewingPayment.member}</p>
                  <p className="text-sm text-muted-foreground">{viewingPayment.memberEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Transaction Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {format(viewingPayment.date, 'MMMM d, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{viewingPayment.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-lg font-bold">${viewingPayment.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fees</Label>
                  <p className="text-sm text-muted-foreground">${viewingPayment.fees || 0}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Net Amount</Label>
                  <p className="text-sm font-medium">${(viewingPayment.amount - (viewingPayment.fees || 0)).toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Method</Label>
                  <div className="mt-1">{getMethodBadge(viewingPayment.method)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="mt-1">{getTypeBadge(viewingPayment.type)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingPayment.status)}</div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setViewingPayment(null)}>Close</Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}