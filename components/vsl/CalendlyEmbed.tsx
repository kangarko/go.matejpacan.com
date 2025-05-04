"use client";

import React from 'react';
import Script from 'next/script'; // Import the Next.js Script component

interface CalendlyEmbedProps {
  url: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  return (
    <>
      <div 
        className="calendly-inline-widget" 
        data-url={url} 
        style={{ minWidth: '320px', height: '700px', overflow: 'hidden' }} // Added overflow hidden for cleaner look
      >
        {/* Remove the loading placeholder, Calendly script will populate this */}
      </div>
      {/* Use Next.js Script component to load Calendly's widget script */}
      <Script 
        type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async 
      />
    </>
  );
};

export default CalendlyEmbed; 