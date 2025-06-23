
import React from 'react';
import { Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const YoutubeIcon: React.FC = () => {
  const youtubeUrl = "https://youtube.com/@qualitypestcontrolservices?si=lpKd1R_T8R3R6ng-";

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
    >
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-700"
      >
        <Youtube className="h-5 w-5" />
      </a>
    </Button>
  );
};
