
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Shield, Bug, Home, Star, Phone, Mail, MapPin, Users, Zap, Clock, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true);
      setShowAuth(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to ShieldPest Control!",
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
        description: "Welcome to ShieldPest Control!",
      });
    }
  };

  const handleGuestAccess = () => {
    setShowAuth(false);
    toast({
      title: "Guest Access",
      description: "Browsing as guest. Sign up for exclusive offers!",
    });
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-800">ShieldPest</h1>
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
              <span className="text-xl font-bold text-green-800">ShieldPest Control</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#services" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#gallery" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
                <a href="#why-us" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Why Us</a>
                <a href="#contact" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            <Button 
              onClick={() => setShowAuth(true)} 
              variant="outline" 
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              {isAuthenticated ? 'Account' : 'Login'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protect Your Home from Pests
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Professional, eco-friendly pest control solutions for your peace of mind
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Free Inspection
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About ShieldPest Control</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience, we are your trusted partner in protecting homes and businesses from unwanted pests. Our team of certified professionals uses the latest eco-friendly techniques to ensure effective and safe pest control.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in building long-term relationships with our clients through exceptional service, transparent pricing, and guaranteed results.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5000+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pest Control Services</h2>
            <p className="text-lg text-gray-600">Comprehensive solutions for all your pest problems</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Cockroach Control', icon: Bug, description: 'Complete elimination of cockroaches with long-lasting protection' },
              { name: 'Termite Treatment', icon: Home, description: 'Advanced termite detection and treatment to protect your property' },
              { name: 'Ant Control', icon: Bug, description: 'Effective ant colony elimination and prevention methods' },
              { name: 'Bedbug Removal', icon: Bug, description: 'Thorough bedbug treatment for a peaceful nights sleep' },
              { name: 'Rodent Control', icon: Bug, description: 'Safe and humane rodent removal and prevention' },
              { name: 'General Pest Control', icon: Shield, description: 'Comprehensive protection against all common pests' },
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <service.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Work Gallery</h2>
            <p className="text-lg text-gray-600">See the results of our professional pest control services</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'photo-1582562124811-c09040d0a901', // Cat (representing pest control)
              'photo-1535268647677-300dbf3d78d1', // Kitten (pest control)
              'photo-1498936178812-4b2e558d2937', // Bees (pest)
              'photo-1501286353178-1ec881214838', // Monkey (pest)
              'photo-1581091226825-a6a2a5aee158', // Woman with laptop (service)
              'photo-1488590528505-98d2b5aba04b', // Laptop (service)
            ].map((imageId, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={`https://images.unsplash.com/${imageId}?w=400&h=300&fit=crop`}
                  alt={`Pest control work ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-lg font-semibold">Professional Service</h4>
                    <p className="text-sm">Quality pest control solution</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ShieldPest Control?</h2>
            <p className="text-lg text-gray-600">We deliver exceptional service with guaranteed results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Expert Technicians', description: 'Certified professionals with years of experience' },
              { icon: Zap, title: 'Eco-Friendly Chemicals', description: 'Safe for your family and pets' },
              { icon: Award, title: 'Affordable Pricing', description: 'Competitive rates with no hidden costs' },
              { icon: Clock, title: '24/7 Support', description: 'Emergency pest control services available' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-300 mb-8">
                Ready to protect your home? Contact us today for a free inspection and quote.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-green-400 mr-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-green-400 mr-4" />
                  <span>info@shieldpest.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-green-400 mr-4" />
                  <span>123 Pest Control Ave, City, State 12345</span>
                </div>
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
                    <textarea 
                      id="contact-message" 
                      placeholder="Tell us about your pest problem..."
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
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

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-xl font-bold text-white">ShieldPest Control</span>
              </div>
              <p className="text-gray-400">
                Professional pest control services protecting homes and businesses since 2008.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-green-400 transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 ShieldPest Control. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
