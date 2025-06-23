import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowRight, 
  Dumbbell, 
  Users, 
  BarChart3, 
  Calendar, 
  CreditCard,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Smartphone,
  HeadphonesIcon,
  Award
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Complete member profiles, subscription tracking, and engagement analytics"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights into revenue, member growth, and business performance"
    },
    {
      icon: Calendar,
      title: "Class Scheduling",
      description: "Automated class booking, trainer management, and capacity optimization"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment handling, automated billing, and financial reporting"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security with encrypted data and compliance standards"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Responsive design that works perfectly on all devices and screen sizes"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small gyms getting started",
      features: [
        "Up to 100 members",
        "Basic analytics",
        "Class scheduling",
        "Payment processing",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "79",
      description: "Ideal for growing fitness businesses",
      features: [
        "Up to 500 members",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Priority support",
        "Marketing tools"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large gyms and fitness chains",
      features: [
        "Unlimited members",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Advanced reporting",
        "Multi-location support"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Gym Owner, FitLife Studio",
      content: "FitManager transformed how we operate. Member retention increased by 40% and our admin time decreased by 60%.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Fitness Director, PowerGym",
      content: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that actually impact our bottom line.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Owner, Wellness Center",
      content: "Customer support is exceptional. The team helped us migrate from our old system seamlessly. Highly recommended!",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Gyms" },
    { number: "2M+", label: "Members Managed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">FitManager</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <ModeToggle />
            <Button asChild>
              <Link href="/login">
                Get Started
              </Link>
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl grid items-center gap-6 pb-8 pt-24 md:py-32 lg:grid-cols-2">
            <div className="flex max-w-[980px] flex-col items-start gap-4">
              <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                🚀 Trusted by 10,000+ gym owners worldwide
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl text-foreground">
                The Complete Gym Management
                <span className="block text-primary">Platform</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Streamline operations, boost member satisfaction, and grow your fitness business with our comprehensive management platform designed specifically for gym owners.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/login">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border hover:bg-muted">
                  <Link href="/dashboard">
                    View Demo
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
              <Card className="relative shadow-2xl border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-card-foreground">Dashboard Overview</CardTitle>
                      <CardDescription>Real-time gym analytics</CardDescription>
                    </div>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Active Members</p>
                      <p className="text-2xl font-bold text-card-foreground">1,247</p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        +12% this month
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-card-foreground">$24,580</p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        +8.2% this month
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">{stat.number}</div>
                  <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <div className="mx-auto max-w-[800px] text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                Everything You Need to Run Your Gym
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive tools designed to streamline every aspect of your fitness business
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                  <CardHeader>
                    <div className="rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <div className="mx-auto max-w-[800px] text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the perfect plan for your gym. Upgrade or downgrade at any time.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative border-border bg-card ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-card-foreground">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-card-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-card-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6" 
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/login">
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <div className="mx-auto max-w-[800px] text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                Loved by Gym Owners Worldwide
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our customers have to say about FitManager
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-sm leading-relaxed mb-4 text-card-foreground">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Ready to Transform Your Gym?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-[600px] mx-auto">
              Join thousands of successful gym owners who have streamlined their operations and grown their business with FitManager.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/login">
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/dashboard">
                  View Live Demo
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-75">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">FitManager</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete gym management platform trusted by fitness professionals worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 FitManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}