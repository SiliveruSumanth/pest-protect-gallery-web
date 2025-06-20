import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Bug, Home, Star, Phone, Mail, MapPin, Users, Zap, Clock, Award, Menu, X, Calendar, CheckCircle, Truck, Shield as ShieldIcon, Leaf, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    address: '',
    pestType: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true);
      setShowAuth(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to Sathavahana Pest Control!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    if (signupForm.name && signupForm.email && signupForm.password) {
      setIsAuthenticated(true);
      setShowAuth(false);
      toast({
        title: "Account Created",
        description: "Welcome to Sathavahana Pest Control!",
      });
    }
  };

  const handleGuestAccess = () => {
    setShowAuth(false);
    toast({
      title: "Guest Access",
      description: "Browsing as guest. Contact us for exclusive offers!",
    });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointmentForm.name && appointmentForm.phone && appointmentForm.address && appointmentForm.pestType) {
      toast({
        title: "Appointment Booked",
        description: "We'll contact you soon to confirm your appointment!",
      });
      setAppointmentForm({
        name: '',
        phone: '',
        address: '',
        pestType: '',
        preferredDate: '',
        preferredTime: ''
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const navigateToSection = (section: string) => {
    setCurrentView(section);
    setMobileMenuOpen(false);
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-800">Sathavahana</h1>
            </div>
            <CardTitle>Protect Your Home</CardTitle>
            <CardDescription>Professional pest control services you can trust</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={handleGuestAccess} className="w-full">
                Continue Without Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Website Content
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-xl font-bold text-green-800">Sathavahana Pest Control</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => navigateToSection('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Home</button>
                <button onClick={() => navigateToSection('about')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'about' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>About</button>
                <button onClick={() => navigateToSection('services')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'services' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Services</button>
                <button onClick={() => navigateToSection('gallery')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'gallery' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Gallery</button>
                <button onClick={() => navigateToSection('appointment')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'appointment' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Appointment</button>
                <button onClick={() => navigateToSection('contact')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>Contact</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
            
            <Button 
              onClick={() => setShowAuth(true)} 
              variant="outline" 
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white hidden md:block"
            >
              {isAuthenticated ? 'Account' : 'Login'}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button onClick={() => navigateToSection('home')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Home</button>
                <button onClick={() => navigateToSection('about')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">About</button>
                <button onClick={() => navigateToSection('services')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Services</button>
                <button onClick={() => navigateToSection('gallery')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Gallery</button>
                <button onClick={() => navigateToSection('appointment')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Appointment</button>
                <button onClick={() => navigateToSection('contact')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 w-full text-left">Contact</button>
                <Button 
                  onClick={() => setShowAuth(true)} 
                  variant="outline" 
                  size="sm"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full mt-3"
                >
                  {isAuthenticated ? 'Account' : 'Login'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content based on current view */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Sathavahana Pest Control Services
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-green-100">
                  Professional, eco-friendly pest control solutions for Telangana and Andhra Pradesh
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={() => navigateToSection('contact')}
                >
                  Get Free Inspection
                </Button>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sathavahana Pest Control?</h2>
                <p className="text-lg text-gray-600">We deliver exceptional service with guaranteed results</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Truck, title: 'Fast Pest Removal', description: 'Quick response and efficient pest elimination' },
                  { icon: CheckCircle, title: 'Free Home Inspection', description: 'Comprehensive assessment at no cost' },
                  { icon: Leaf, title: 'Eco-Friendly Technology', description: 'Safe for your family and environment' },
                  { icon: ShieldIcon, title: 'Licensed & Protected Services', description: 'Certified professionals with insurance coverage' },
                ].map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Preview with Real Images */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pest Control Services</h2>
                <p className="text-lg text-gray-600">Professional solutions with proven results</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    name: 'Cockroach Control', 
                    image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
                    description: 'Complete elimination with kitchen-safe treatments'
                  },
                  { 
                    name: 'Termite Control', 
                    image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
                    description: 'Advanced detection and foundation protection'
                  },
                  { 
                    name: 'Professional Equipment', 
                    image: '/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png',
                    description: 'State-of-the-art pest control technology'
                  },
                  { 
                    name: 'Precision Treatment', 
                    image: '/lovable-uploads/45c01aae-6856-4fbc-ae3e-bf4ef46b86ff.png',
                    description: 'Targeted pest elimination using precision application methods'
                  }
                ].map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 text-white">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => navigateToSection('services')} className="bg-green-600 hover:bg-green-700">
                  View All Services
                </Button>
              </div>
            </div>
          </section>

          {/* Before & After Results Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Results, Real Impact</h2>
                <p className="text-lg text-gray-600">See the effectiveness of our professional pest control treatments</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Foundation Protection",
                    beforeImage: "/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png",
                    afterImage: "/lovable-uploads/b482c87c-ac2d-4d5e-bc95-50022a20fc98.png",
                    description: "Complete termite elimination and prevention treatment"
                  },
                  {
                    title: "Kitchen Pest Control",
                    beforeImage: "/lovable-uploads/8f49db26-4929-4caa-bad8-202a854b8b2d.png",
                    afterImage: "/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png",
                    description: "Thorough cockroach and kitchen pest elimination"
                  }
                ].map((result, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-center">{result.title}</CardTitle>
                      <CardDescription className="text-center">{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-red-600 mb-2">Before Treatment</p>
                          <div className="relative overflow-hidden rounded-lg">
                            <img 
                              src={result.beforeImage}
                              alt="Before treatment"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                              Problem
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-green-600 mb-2">After Treatment</p>
                          <div className="relative overflow-hidden rounded-lg">
                            <img 
                              src={result.afterImage}
                              alt="After treatment"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                              Solved
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-4">
                        <ArrowRight className="h-6 w-6 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Testimonials</h2>
                <p className="text-lg text-gray-600">What our satisfied customers say about us</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Rajesh Kumar",
                    rating: 5,
                    review: "Excellent service! They completely eliminated the cockroach problem in my home. Very professional team."
                  },
                  {
                    name: "Priya Sharma",
                    rating: 5,
                    review: "Fast and efficient termite treatment. The technicians were knowledgeable and used eco-friendly methods."
                  },
                  {
                    name: "Venkat Reddy",
                    rating: 5,
                    review: "Highly recommend Sathavahana Pest Control. Great customer service and effective pest solutions."
                  }
                ].map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                      <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === 'about' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Sathavahana Pest Control Services</h2>
                <p className="text-lg text-gray-600 mb-6">
                  With over 15 years of experience serving Telangana and Andhra Pradesh, Sathavahana Pest Control Services is your trusted partner in maintaining pest-free environments. Our team of certified professionals uses the latest eco-friendly techniques to ensure effective and safe pest control solutions.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We are committed to customer satisfaction and safety, building long-term relationships through exceptional service, transparent pricing, and guaranteed results. Our comprehensive approach covers residential, commercial, and industrial pest control needs across both states.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2</div>
                    <div className="text-sm text-gray-500">States Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-500">Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-100 p-8 rounded-lg">
                <Home className="h-32 w-32 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center text-gray-800">Your Home, Protected</h3>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentView === 'services' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Pest Control Solutions</h2>
              <p className="text-lg text-gray-600">Professional services with guaranteed results</p>
            </div>
            
            {/* Featured Service with Large Image */}
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src="/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png"
                      alt="Professional pest control equipment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Professional Equipment & Techniques</h3>
                    <p className="text-gray-600 mb-4">
                      We use state-of-the-art equipment and eco-friendly chemicals to ensure effective pest elimination 
                      while keeping your family and pets safe. Our certified technicians are trained in the latest 
                      pest control methods.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Eco-friendly chemicals</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Advanced equipment</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Certified technicians</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Guaranteed results</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Service Grid with Images */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Kitchen Pest Control', 
                  icon: Bug, 
                  image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
                  description: 'Complete elimination of cockroaches with safe, food-grade treatments for kitchen areas'
                },
                { 
                  name: 'Termite Control', 
                  icon: Home, 
                  image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
                  description: 'Advanced termite detection and treatment to protect your property foundation'
                },
                { 
                  name: 'Detailed Inspection', 
                  icon: Bug, 
                  image: '/lovable-uploads/8f49db26-4929-4caa-bad8-202a854b8b2d.png',
                  description: 'Comprehensive pest inspection to identify problem areas and entry points'
                },
                { 
                  name: 'Precision Treatment', 
                  icon: Bug, 
                  image: '/lovable-uploads/45c01aae-6856-4fbc-ae3e-bf4ef46b86ff.png',
                  description: 'Targeted pest elimination using precision application methods'
                },
                { 
                  name: 'Foundation Treatment', 
                  icon: Bug, 
                  image: '/lovable-uploads/b482c87c-ac2d-4d5e-bc95-50022a20fc98.png',
                  description: 'Pre-construction and post-construction foundation pest prevention'
                },
                { 
                  name: 'Bed Bugs Removal', 
                  icon: Bug, 
                  image: '/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png',
                  description: 'Thorough bed bug treatment for peaceful, pest-free sleep'
                },
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <service.icon className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentView === 'gallery' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Work Gallery</h2>
              <p className="text-lg text-gray-600">See our professional pest control services in action</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: '/lovable-uploads/162eefb3-cdc3-43e1-858e-ba5f5f2166a2.png', title: 'Professional Equipment', description: 'State-of-the-art pest control equipment' },
                { src: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png', title: 'Kitchen Treatment', description: 'Thorough kitchen pest control service' },
                { src: '/lovable-uploads/8f49db26-4929-4caa-bad8-202a854b8b2d.png', title: 'Detailed Inspection', description: 'Comprehensive pest inspection process' },
                { src: '/lovable-uploads/45c01aae-6856-4fbc-ae3e-bf4ef46b86ff.png', title: 'Precision Treatment', description: 'Targeted pest elimination methods' },
                { src: '/lovable-uploads/b482c87c-ac2d-4d5e-bc95-50022a20fc98.png', title: 'Foundation Treatment', description: 'Pre-construction pest prevention' },
                { src: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png', title: 'Termite Problem', description: 'Before treatment - termite infestation' },
              ].map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-lg font-semibold mb-2">{image.title}</h4>
                      <p className="text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentView === 'appointment' && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
              <p className="text-lg text-gray-600">Schedule your pest control service today</p>
            </div>
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        value={appointmentForm.name}
                        onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 9492309305"
                        value={appointmentForm.phone}
                        onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Your complete address"
                      value={appointmentForm.address}
                      onChange={(e) => setAppointmentForm({...appointmentForm, address: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pestType">Type of Pest Problem *</Label>
                    <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, pestType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pest type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cockroach">Cockroach Control</SelectItem>
                        <SelectItem value="termite">Termite Control</SelectItem>
                        <SelectItem value="lizard">Lizard Removal</SelectItem>
                        <SelectItem value="rodent">Rat or Mice Control</SelectItem>
                        <SelectItem value="flies">Flies Control</SelectItem>
                        <SelectItem value="ants">Red & Black Ants Control</SelectItem>
                        <SelectItem value="bedbugs">Bed Bugs Removal</SelectItem>
                        <SelectItem value="general">General Pest Control</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentForm.preferredDate}
                        onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select onValueChange={(value) => setAppointmentForm({...appointmentForm, preferredTime: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {currentView === 'contact' && (
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Ready to protect your home? Contact Sathavahana Pest Control Services today for a free inspection and quote.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-green-400 mr-4" />
                    <div>
                      <div>+91 9492309305</div>
                      <div>+91 9492309305</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-green-400 mr-4" />
                    <div>
                      <div>qualitypestcontrolservices1@gmail.com</div>
                      <div>javvadiyaladri@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-green-400 mr-4" />
                    <span>16-3-133/1, Perikawada, Warangal</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-300 mb-2">YouTube Channel:</p>
                  <p className="text-green-400">Quality Pest Control Services</p>
                </div>
              </div>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name" className="text-white">Name</Label>
                      <Input id="contact-name" placeholder="Your Name" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-white">Phone</Label>
                      <Input id="contact-phone" placeholder="Your Phone" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email" className="text-white">Email</Label>
                      <Input id="contact-email" type="email" placeholder="Your Email" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="contact-message" className="text-white">Message</Label>
                      <Textarea 
                        id="contact-message" 
                        placeholder="Tell us about your pest problem..."
                        className="bg-gray-700 border-gray-600 text-white"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-xl font-bold text-white">Sathavahana Pest Control</span>
              </div>
              <p className="text-gray-400">
                Professional pest control services protecting homes and businesses across Telangana and Andhra Pradesh since 2008.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigateToSection('home')} className="hover:text-green-400 transition-colors">Home</button></li>
                <li><button onClick={() => navigateToSection('about')} className="hover:text-green-400 transition-colors">About</button></li>
                <li><button onClick={() => navigateToSection('services')} className="hover:text-green-400 transition-colors">Services</button></li>
                <li><button onClick={() => navigateToSection('contact')} className="hover:text-green-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Service Areas</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Telangana</li>
                <li className="text-gray-400">Andhra Pradesh</li>
                <li className="text-gray-400">Warangal</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Sathavahana Pest Control Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
