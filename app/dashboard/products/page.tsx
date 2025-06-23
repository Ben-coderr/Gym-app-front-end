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
  MoreHorizontal,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Eye,
  Star,
  Image as ImageIcon
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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  category: string;
  stock: number;
  minStock: number;
  sku: string;
  status: "active" | "inactive" | "out-of-stock";
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const categories = [
  "Supplements",
  "Equipment", 
  "Apparel",
  "Accessories",
  "Food & Beverages",
  "Personal Care",
  "Other"
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Whey Protein Powder",
      description: "Premium whey protein isolate for muscle building and recovery",
      price: 49.99,
      cost: 25.00,
      category: "Supplements",
      stock: 45,
      minStock: 10,
      sku: "WPP-001",
      status: "active",
      tags: ["protein", "supplement", "muscle"],
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-15"),
    },
    {
      id: "2",
      name: "Resistance Bands Set",
      description: "Complete set of resistance bands with different resistance levels",
      price: 29.99,
      cost: 12.00,
      category: "Equipment",
      stock: 23,
      minStock: 5,
      sku: "RBS-002",
      status: "active",
      tags: ["equipment", "resistance", "training"],
      createdAt: new Date("2025-01-02"),
      updatedAt: new Date("2025-01-14"),
    },
    {
      id: "3",
      name: "Gym T-Shirt",
      description: "Comfortable cotton blend t-shirt with gym logo",
      price: 24.99,
      cost: 8.00,
      category: "Apparel",
      stock: 0,
      minStock: 15,
      sku: "GTS-003",
      status: "out-of-stock",
      tags: ["apparel", "shirt", "cotton"],
      createdAt: new Date("2025-01-03"),
      updatedAt: new Date("2025-01-13"),
    },
    {
      id: "4",
      name: "Pre-Workout Energy Drink",
      description: "Natural energy boost for intense workouts",
      price: 3.99,
      cost: 1.50,
      category: "Food & Beverages",
      stock: 78,
      minStock: 20,
      sku: "PWD-004",
      status: "active",
      tags: ["drink", "energy", "pre-workout"],
      createdAt: new Date("2025-01-04"),
      updatedAt: new Date("2025-01-12"),
    },
    {
      id: "5",
      name: "Yoga Mat Premium",
      description: "High-quality non-slip yoga mat with carrying strap",
      price: 39.99,
      cost: 18.00,
      category: "Equipment",
      stock: 12,
      minStock: 8,
      sku: "YMP-005",
      status: "active",
      tags: ["yoga", "mat", "premium"],
      createdAt: new Date("2025-01-05"),
      updatedAt: new Date("2025-01-11"),
    },
    {
      id: "6",
      name: "Protein Shaker Bottle",
      description: "BPA-free shaker bottle with mixing ball",
      price: 12.99,
      cost: 4.50,
      category: "Accessories",
      stock: 34,
      minStock: 12,
      sku: "PSB-006",
      status: "active",
      tags: ["shaker", "bottle", "protein"],
      createdAt: new Date("2025-01-06"),
      updatedAt: new Date("2025-01-10"),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    cost: "",
    category: "",
    stock: "",
    minStock: "",
    sku: "",
    tags: "",
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.cost),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock),
      sku: newProduct.sku,
      status: parseInt(newProduct.stock) > 0 ? "active" : "out-of-stock",
      tags: newProduct.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setProducts([product, ...products]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      cost: product.cost.toString(),
      category: product.category,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      sku: product.sku,
      tags: product.tags.join(", "),
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    const updatedProducts = products.map(product => 
      product.id === editingProduct.id 
        ? {
            ...product,
            name: newProduct.name,
            description: newProduct.description,
            price: parseFloat(newProduct.price),
            cost: parseFloat(newProduct.cost),
            category: newProduct.category,
            stock: parseInt(newProduct.stock),
            minStock: parseInt(newProduct.minStock),
            sku: newProduct.sku,
            status: parseInt(newProduct.stock) > 0 ? "active" : "out-of-stock" as Product["status"],
            tags: newProduct.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
            updatedAt: new Date(),
          }
        : product
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleStatusChange = (productId: string, status: Product["status"]) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status, updatedAt: new Date() } : product
    ));
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      cost: "",
      category: "",
      stock: "",
      minStock: "",
      sku: "",
      tags: "",
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "out-of-stock":
        return <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Out of Stock
        </Badge>;
      default:
        return null;
    }
  };

  const getLowStockBadge = (stock: number, minStock: number) => {
    if (stock <= minStock && stock > 0) {
      return <Badge variant="outline" className="gap-1 text-orange-600">
        <AlertTriangle className="h-3 w-3" />
        Low Stock
      </Badge>;
    }
    return null;
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStockProducts = products.filter(p => p.status === 'out-of-stock').length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

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
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your gym's product inventory and sales items</p>
        </div>
        <Dialog open={isAddDialogOpen || !!editingProduct} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingProduct(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update the product details." : "Add a new product to your inventory."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Whey Protein Powder"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="WPP-001"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Sale Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="49.99"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Cost Price ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={newProduct.cost}
                    onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                    placeholder="25.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Current Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minStock">Minimum Stock Level</Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    value={newProduct.minStock}
                    onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newProduct.tags}
                  onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                  placeholder="protein, supplement, muscle"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setEditingProduct(null);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold">{totalProducts}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                  <p className="text-sm text-muted-foreground">Active Products</p>
                  <h3 className="text-2xl font-bold">{activeProducts}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <h3 className="text-2xl font-bold">{outOfStockProducts}</h3>
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
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <h3 className="text-2xl font-bold">{lowStockProducts}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <h3 className="text-2xl font-bold">${totalValue.toLocaleString()}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                  <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage your product catalog, track inventory levels, and monitor stock status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Export</Button>
              <Button variant="outline">Import</Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden lg:table-cell">Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {product.category} • ${product.price}
                          </div>
                          {getLowStockBadge(product.stock, product.minStock)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell className="hidden md:table-cell font-medium">${product.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className={product.stock <= product.minStock ? "text-orange-600 font-medium" : ""}>
                          {product.stock} units
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Min: {product.minStock}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      ${(product.price * product.stock).toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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
                            onClick={() => setViewingProduct(product)}
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {product.status !== 'active' && (
                            <DropdownMenuItem 
                              className="gap-2"
                              onClick={() => handleStatusChange(product.id, 'active')}
                            >
                              Activate
                            </DropdownMenuItem>
                          )}
                          {product.status !== 'inactive' && (
                            <DropdownMenuItem 
                              className="gap-2"
                              onClick={() => handleStatusChange(product.id, 'inactive')}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
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

      {/* Product Details Dialog */}
      <Dialog open={!!viewingProduct} onOpenChange={() => setViewingProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Complete product information and specifications
            </DialogDescription>
          </DialogHeader>
          {viewingProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{viewingProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{viewingProduct.description}</p>
                  <div className="flex gap-2 mt-2">
                    {viewingProduct.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">SKU</Label>
                  <p className="text-sm text-muted-foreground font-mono">{viewingProduct.sku}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-muted-foreground">{viewingProduct.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Sale Price</Label>
                  <p className="text-sm text-muted-foreground">${viewingProduct.price}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Cost Price</Label>
                  <p className="text-sm text-muted-foreground">${viewingProduct.cost}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Current Stock</Label>
                  <p className={`text-sm ${viewingProduct.stock <= viewingProduct.minStock ? 'text-orange-600 font-medium' : 'text-muted-foreground'}`}>
                    {viewingProduct.stock} units
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Min Stock</Label>
                  <p className="text-sm text-muted-foreground">{viewingProduct.minStock} units</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Profit Margin</Label>
                  <p className="text-sm text-muted-foreground">
                    {(((viewingProduct.price - viewingProduct.cost) / viewingProduct.price) * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Value</Label>
                  <p className="text-sm text-muted-foreground">
                    ${(viewingProduct.price * viewingProduct.stock).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingProduct.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Stock Alert</Label>
                  <div className="mt-1">{getLowStockBadge(viewingProduct.stock, viewingProduct.minStock) || <Badge variant="outline">Normal</Badge>}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p>{viewingProduct.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p>{viewingProduct.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setViewingProduct(null)}>Close</Button>
            <Button onClick={() => {
              if (viewingProduct) {
                handleEditProduct(viewingProduct);
                setViewingProduct(null);
              }
            }}>
              Edit Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}