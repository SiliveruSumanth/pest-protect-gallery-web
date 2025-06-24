
import React from 'react';

export const GalleryPage: React.FC = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Work Gallery</h2>
          <p className="text-lg text-muted-foreground">See our professional pest control services in action</p>
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
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
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
  );
};
