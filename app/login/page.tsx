"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Dumbbell, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gymName: "",
    agreeToTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

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

  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Comprehensive member tracking and engagement tools"
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Live insights into your gym's performance and growth"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">FitManager</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <motion.div 
            className="space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Manage Your Gym
                <span className="block text-primary">Like a Pro</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of gym owners who trust FitManager to streamline their operations, 
                boost member satisfaction, and grow their business.
              </p>
            </motion.div>

            <motion.div variants={item} className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card border hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="rounded-full bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={item}
              className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20"
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm">
                <strong>30-day free trial</strong> • No credit card required • Cancel anytime
              </span>
            </motion.div>
          </motion.div>

          {/* Right Side - Login/Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto shadow-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="remember"
                            checked={loginData.rememberMe}
                            onCheckedChange={(checked) => setLoginData({...loginData, rememberMe: checked as boolean})}
                          />
                          <Label htmlFor="remember" className="text-sm">Remember me</Label>
                        </div>
                        <Link href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Signup Tab */}
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              placeholder="John Doe"
                              className="pl-10"
                              value={signupData.name}
                              onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gymName">Gym Name</Label>
                          <div className="relative">
                            <Dumbbell className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="gymName"
                              placeholder="FitLife Gym"
                              className="pl-10"
                              value={signupData.gymName}
                              onChange={(e) => setSignupData({...signupData, gymName: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={signupData.email}
                            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signupPassword"
                            type="password"
                            placeholder="Create a password"
                            className="pl-10"
                            value={signupData.password}
                            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="pl-10"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={signupData.agreeToTerms}
                          onCheckedChange={(checked) => setSignupData({...signupData, agreeToTerms: checked as boolean})}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                          <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}