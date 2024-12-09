import React from 'react';
import { urlForImage } from '@/sanity/lib/utils';

type ServiceProps = {
  block: {
    heading: string;
    description: string;
    image: {
      asset: {
        _ref: string;
      };
    };
  };
};

export default function Service({ block }: ServiceProps) {
  return (
    <div className="service-block">
      {block.image?.asset?._ref && (
        <img
          src={urlForImage(block.image).url()}
          alt={block.heading}
          className="service-image"
        />
      )}
      <h3 className="service-heading">{block.heading}</h3>
      <p className="service-description">{block.description}</p>
    </div>
  );
} 