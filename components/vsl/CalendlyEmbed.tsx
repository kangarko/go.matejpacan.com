"use client";

import React from 'react';
import Script from 'next/script';

interface CalendlyEmbedProps {
    url: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
    return (
        <>
            <div
                className="calendly-inline-widget"
                data-url={url}
                style={{ minWidth: '320px', height: '700px', overflow: 'hidden', borderRadius: '10px' }}
            >
            </div>
            <Script
                type="text/javascript"
                src="https://assets.calendly.com/assets/external/widget.js"
                async
            />
        </>
    );
};

export default CalendlyEmbed; 