
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bug, Home, CheckCircle } from "lucide-react";
import { ServiceModal } from "@/components/ui/service-modal";

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      name: 'Kitchen Pest Control',
      icon: Bug,
      image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
      description: 'Complete elimination of cockroaches with safe, food-grade treatments for kitchen areas',
      problems: [
        'Ants in containers',
        'Cockroaches near stove/sink',
        'Rodents damaging food'
      ],
      howWeRemove: [
        'Gel baiting around kitchen areas',
        'Herbal sprays for immediate effect',
        'Crack sealing to prevent re-entry'
      ],
      details: [
        'Food-safe, child-safe chemicals',
        'No need to empty kitchen cabinets',
        '30-day warranty included'
      ]
    },
    {
      name: 'Termite Control',
      icon: Home,
      image: '/lovable-uploads/65c5f08f-08cf-47c4-b1b3-c271fad06a41.png',
      description: 'Advanced termite detection and treatment to protect your property foundation',
      problems: [
        'Wood damage and hollow furniture',
        'Termite mud tubes visible',
        'Foundation weakening'
      ],
      howWeRemove: [
        'Drilling & chemical injection',
        'Pre/post-construction foundation treatment',
        'Soil treatment around foundation'
      ],
      details: [
        'Long-term warranty available',
        'Annual maintenance checks',
        'Safe for all building materials'
      ]
    },
    {
      name: 'Detailed Inspection',
      icon: Bug,
      image: '/lovable-uploads/8f49db26-4929-4caa-bad8-202a854b8b2d.png',
      description: 'Comprehensive pest inspection to identify problem areas and entry points',
      problems: [
        'Unknown pest origins',
        'Recurring infestations',
        'Hidden breeding areas'
      ],
      howWeRemove: [
        'Full-home inspection with checklist',
        'Moisture and entry point checks',
        'Detailed report with recommendations'
      ],
      details: [
        'Free with major treatments',
        'Digital inspection report',
        'Follow-up recommendations'
      ]
    },
    {
      name: 'Cockroach Control',
      icon: Bug,
      image: '/lovable-uploads/0ce032b6-9180-4356-861e-4fb1cc5211c4.png',
      description: 'Non-smell gel bait and drain treatment for complete cockroach elimination',
      problems: [
        'Roaches in kitchen & bathroom',
        'Bad odor from drains',
        'Food contamination risk'
      ],
      howWeRemove: [
        'Non-smell gel bait application',
        'Drain treatment and cleaning',
        'Targeted spray in hiding spots'
      ],
      details: [
        '100% safe for pets and kids',
        'Odorless treatment method',
        '45-day effectiveness guarantee'
      ]
    },
    {
      name: 'Precision Treatment',
      icon: Bug,
      image: '/lovable-uploads/45c01aae-6856-4fbc-ae3e-bf4ef46b86ff.png',
      description: 'Targeted pest elimination using precision application methods',
      problems: [
        'Sensitive electronic equipment areas',
        'Delicate fabric and furniture',
        'Targeted pest issues'
      ],
      howWeRemove: [
        'Spot gel applications',
        'Micro-nozzle spray systems',
        'Precision targeting techniques'
      ],
      details: [
        'Minimal chemical usage',
        'Perfect for sensitive areas',
        'No damage to electronics'
      ]
    },
    {
      name: 'Foundation Treatment',
      icon: Bug,
      image: '/lovable-uploads/b482c87c-ac2d-4d5e-bc95-50022a20fc98.png',
      description: 'Pre-construction and post-construction foundation pest prevention',
      problems: [
        'Termites entering from beneath',
        'Foundation cracks and gaps',
        'New construction vulnerability'
      ],
      howWeRemove: [
        'Soil trenching around foundation',
        'Chemical injection in foundation',
        'Barrier creation techniques'
      ],
      details: [
        'Ideal during construction phase',
        '10-year warranty available',
        'Prevents future infestations'
      ]
    },
    {
      name: 'Bed Bugs Removal',
      icon: Bug,
      image: '/lovable-uploads/bed-bugs-image.jpg',
      description: 'Thorough bed bug treatment for peaceful, pest-free sleep',
      problems: [
        'Bites and blood spots on bed',
        'Bugs visible in mattress seams',
        'Itching and sleep disturbance'
      ],
      howWeRemove: [
        'Steam treatment for mattresses',
        'Spray-based extermination',
        'Heat treatment for severe cases'
      ],
      details: [
        '2-session treatment plan',
        'Safe on all fabric types',
        '60-day follow-up included'
      ]
    }
  ];

  const handleKnowMore = (service: any) => {
    setSelectedService({
      title: service.name,
      image: service.image,
      problems: service.problems,
      howWeRemove: service.howWeRemove,
      details: service.details
    });
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Complete Pest Control Solutions</h2>
          <p className="text-lg text-muted-foreground">Professional services with guaranteed results</p>
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
                <p className="text-muted-foreground mb-4">
                  We use state-of-the-art equipment and eco-friendly chemicals to ensure effective pest elimination 
                  while keeping your family and pets safe. Our certified technicians are trained in the latest 
                  pest control methods.
                </p>
                <ul className="space-y-2 text-muted-foreground">
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
          {services.map((service, index) => (
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
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button 
                  onClick={() => handleKnowMore(service)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Know More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />
      )}
    </section>
  );
};
