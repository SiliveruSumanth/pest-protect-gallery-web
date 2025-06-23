
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    image?: string;
    problems: string[];
    howWeRemove: string[];
    details: string[];
  };
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 dark:text-green-400">
            {service.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {service.image && (
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img 
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-600">Problems We Address:</h3>
            <ul className="space-y-2">
              {service.problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600">How We Remove Them:</h3>
            <ul className="space-y-2">
              {service.howWeRemove.map((method, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Additional Details:</h3>
            <ul className="space-y-2">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={() => window.open('tel:+919492309305', '_self')}
              className="bg-green-600 hover:bg-green-700"
            >
              Call Now
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.', '_blank')}
              variant="outline"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
