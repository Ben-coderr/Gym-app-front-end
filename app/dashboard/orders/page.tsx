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
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Clock
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

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  orderDate: Date;
  notes?: string;
}

const mockProducts = [
  { id: "1", name: "Protein Shake", price: 8.99 },
  { id: "2", name: "Energy Bar", price: 3.99 },
  { id: "3", name: "Sports Drink", price: 2.99 },
  { id: "4", name: "Gym Towel", price: 12.99 },
  { id: "5", name: "Water Bottle", price: 15.99 },
  { id: "6", name: "Resistance Band", price: 19.99 },
  { id: "7", name: "Yoga Mat", price: 29.99 },
  { id: "8", name: "Gym Gloves", price: 24.99 },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-001",
      customer: "John Smith",
      customerEmail: "john.smith@example.com",
      items: [
        { id: "1", name: "Protein Shake", quantity: 2, price: 8.99 },
        { id: "2", name: "Energy Bar", quantity: 3, price: 3.99 },
      ],
      total: 29.95,
      status: "completed",
      paymentStatus: "paid",
      orderDate: new Date("2025-01-15T10:30:00"),
      notes: "Customer requested extra napkins",
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customer: "Emma Watson",
      customerEmail: "emma.watson@example.com",
      items: [
        { id: "3", name: "Sports Drink", quantity: 1, price: 2.99 },
        { id: "4", name: "Gym Towel", quantity: 1, price: 12.99 },
      ],
      total: 15.98,
      status: "processing",
      paymentStatus: "paid",
      orderDate: new Date("2025-01-15T14:15:00"),
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      customer: "Michael Brown",
      customerEmail: "michael.brown@example.com",
      items: [
        { id: "5", name: "Water Bottle", quantity: 1, price: 15.99 },
        { id: "6", name: "Resistance Band", quantity: 2, price: 19.99 },
      ],
      total: 55.97,
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date("2025-01-15T16:45:00"),
    },
    {
      id: "4",
      orderNumber: "ORD-004",
      customer: "Sarah Johnson",
      customerEmail: "sarah.johnson@example.com",
      items: [
        { id: "7", name: "Yoga Mat", quantity: 1, price: 29.99 },
        { id: "8", name: "Gym Gloves", quantity: 1, price: 24.99 },
      ],
      total: 54.98,
      status: "completed",
      paymentStatus: "paid",
      orderDate: new Date("2025-01-14T09:20:00"),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    customerEmail: "",
    items: [] as { productId: string; quantity: number }[],
    notes: "",
  });

  const handleAddOrder = () => {
    const orderItems: OrderItem[] = newOrder.items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      return {
        id: item.productId,
        name: product?.name || "",
        quantity: item.quantity,
        price: product?.price || 0,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order: Order = {
      id: (orders.length + 1).toString(),
      orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      customerEmail: newOrder.customerEmail,
      items: orderItems,
      total,
      status: "pending",
      paymentStatus: "pending",
      orderDate: new Date(),
      notes: newOrder.notes,
    };
    
    setOrders([order, ...orders]);
    setIsAddDialogOpen(false);
    setNewOrder({ customer: "", customerEmail: "", items: [], notes: "" });
  };

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handlePaymentStatusChange = (orderId: string, paymentStatus: Order["paymentStatus"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus } : order
    ));
  };

  const addItemToOrder = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: "", quantity: 1 }]
    });
  };

  const updateOrderItem = (index: number, field: string, value: string | number) => {
    const updatedItems = newOrder.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const removeOrderItem = (index: number) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((_, i) => i !== index)
    });
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default\" className="gap-1"><CheckCircle className="h-3 w-3" />Completed</Badge>;
      case "processing":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Processing</Badge>;
      case "pending":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <Badge variant="default">Paid</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

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
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and track sales</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Add a new order for a customer with products and quantities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    value={newOrder.customer}
                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={newOrder.customerEmail}
                    onChange={(e) => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Order Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItemToOrder}>
                    Add Item
                  </Button>
                </div>
                {newOrder.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Select 
                        value={item.productId} 
                        onValueChange={(value) => updateOrderItem(index, 'productId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - ${product.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-20">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value))}
                        placeholder="Qty"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeOrderItem(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Special instructions or notes"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOrder} disabled={!newOrder.customer || newOrder.items.length === 0}>
                Create Order
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
                  <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
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
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">{totalOrders}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <h3 className="text-2xl font-bold">{pendingOrders}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                  <Package className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <h3 className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            View and manage all customer orders, track status, and process payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
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
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {format(order.orderDate, 'MMM d, yyyy')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(order.orderDate, 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="max-w-xs">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{order.items.length - 2} more items
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{getPaymentBadge(order.paymentStatus)}</TableCell>
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
                            onClick={() => setViewingOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleStatusChange(order.id, 'processing')}
                          >
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleStatusChange(order.id, 'completed')}
                          >
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                          >
                            <Trash2 className="h-4 w-4" />
                            Cancel Order
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

      {/* Order Details Dialog */}
      <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {viewingOrder?.orderNumber}</DialogTitle>
            <DialogDescription>
              Complete order information and item breakdown
            </DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-muted-foreground">{viewingOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{viewingOrder.customerEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Order Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {format(viewingOrder.orderDate, 'MMMM d, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Items</Label>
                <div className="mt-2 space-y-2">
                  {viewingOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold">${viewingOrder.total.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingOrder.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment</Label>
                  <div className="mt-1">{getPaymentBadge(viewingOrder.paymentStatus)}</div>
                </div>
              </div>

              {viewingOrder.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground mt-1">{viewingOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setViewingOrder(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}