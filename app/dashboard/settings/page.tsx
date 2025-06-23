"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings,
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Globe,
  Clock,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  Key,
  Users,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [gymSettings, setGymSettings] = useState({
    name: "FitLife Gym",
    email: "info@fitlifegym.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fitness Street, Health City, HC 12345",
    website: "www.fitlifegym.com",
    description: "Premium fitness facility with state-of-the-art equipment and expert trainers.",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    membershipExpiry: true,
    paymentReminders: true,
    classBookings: true,
    lowStock: true,
    systemUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  const [billing, setBilling] = useState({
    plan: "Premium",
    nextBilling: "2025-02-15",
    autoRenew: true,
    paymentMethod: "**** **** **** 1234",
  });

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
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your gym settings and preferences</p>
        </div>
        <Button className="gap-2 w-full md:w-auto">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general" className="gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <motion.div 
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Gym Information
                  </CardTitle>
                  <CardDescription>
                    Basic information about your gym
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gymName">Gym Name</Label>
                      <Input
                        id="gymName"
                        value={gymSettings.name}
                        onChange={(e) => setGymSettings({...gymSettings, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={gymSettings.website}
                        onChange={(e) => setGymSettings({...gymSettings, website: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={gymSettings.email}
                        onChange={(e) => setGymSettings({...gymSettings, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={gymSettings.phone}
                        onChange={(e) => setGymSettings({...gymSettings, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={gymSettings.address}
                      onChange={(e) => setGymSettings({...gymSettings, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={gymSettings.description}
                      onChange={(e) => setGymSettings({...gymSettings, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Regional Settings
                  </CardTitle>
                  <CardDescription>
                    Configure timezone, currency, and language preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={gymSettings.timezone} onValueChange={(value) => setGymSettings({...gymSettings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={gymSettings.currency} onValueChange={(value) => setGymSettings({...gymSettings, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={gymSettings.language} onValueChange={(value) => setGymSettings({...gymSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div 
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Email Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">SMS Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Push Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive browser push notifications</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Membership Expiry</p>
                          <p className="text-xs text-muted-foreground">When member subscriptions are about to expire</p>
                        </div>
                        <Switch
                          checked={notifications.membershipExpiry}
                          onCheckedChange={(checked) => setNotifications({...notifications, membershipExpiry: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Payment Reminders</p>
                          <p className="text-xs text-muted-foreground">Overdue payments and payment failures</p>
                        </div>
                        <Switch
                          checked={notifications.paymentReminders}
                          onCheckedChange={(checked) => setNotifications({...notifications, paymentReminders: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Class Bookings</p>
                          <p className="text-xs text-muted-foreground">New class bookings and cancellations</p>
                        </div>
                        <Switch
                          checked={notifications.classBookings}
                          onCheckedChange={(checked) => setNotifications({...notifications, classBookings: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Low Stock Alerts</p>
                          <p className="text-xs text-muted-foreground">When product inventory is running low</p>
                        </div>
                        <Switch
                          checked={notifications.lowStock}
                          onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">System Updates</p>
                          <p className="text-xs text-muted-foreground">Platform updates and maintenance notices</p>
                        </div>
                        <Switch
                          checked={notifications.systemUpdates}
                          onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div 
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={security.twoFactorAuth}
                        onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Select value={security.sessionTimeout} onValueChange={(value) => setSecurity({...security, sessionTimeout: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Select value={security.passwordExpiry} onValueChange={(value) => setSecurity({...security, passwordExpiry: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Select value={security.loginAttempts} onValueChange={(value) => setSecurity({...security, loginAttempts: value})}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="gap-2">
                      <Key className="h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="billing">
          <motion.div 
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing Information
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription and payment details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Current Plan</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default">{billing.plan}</Badge>
                          <span className="text-sm text-muted-foreground">$99/month</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Next Billing Date</Label>
                        <p className="text-sm text-muted-foreground mt-1">{billing.nextBilling}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Auto-Renewal</p>
                          <p className="text-xs text-muted-foreground">Automatically renew subscription</p>
                        </div>
                        <Switch
                          checked={billing.autoRenew}
                          onCheckedChange={(checked) => setBilling({...billing, autoRenew: checked})}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Payment Method</Label>
                        <p className="text-sm text-muted-foreground mt-1">{billing.paymentMethod}</p>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">Update Payment Method</Button>
                        <Button variant="outline" className="w-full">View Billing History</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div 
            className="grid gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Theme</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-white border rounded mb-2"></div>
                          <p className="text-xs text-center">Light</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary border-primary">
                          <div className="w-full h-8 bg-gray-900 rounded mb-2"></div>
                          <p className="text-xs text-center">Dark</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-gradient-to-r from-white to-gray-900 rounded mb-2"></div>
                          <p className="text-xs text-center">System</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sidebar</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary border-primary">
                          <div className="flex gap-1">
                            <div className="w-6 h-8 bg-gray-200 rounded"></div>
                            <div className="flex-1 h-8 bg-gray-100 rounded"></div>
                          </div>
                          <p className="text-xs text-center mt-2">Expanded</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                          <div className="flex gap-1">
                            <div className="w-3 h-8 bg-gray-200 rounded"></div>
                            <div className="flex-1 h-8 bg-gray-100 rounded"></div>
                          </div>
                          <p className="text-xs text-center mt-2">Collapsed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}