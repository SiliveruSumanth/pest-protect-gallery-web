
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/919492309305?text=Hello%2C%20I%20visited%20your%20website%20Quality%20Pest%20Control%20Services%20and%20would%20like%20to%20know%20more%20about%20your%20pest%20control%20solutions.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};
