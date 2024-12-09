"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export default function ServicesHero() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const fetchedServices = await client.fetch(servicesQuery);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    }
    fetchServices();
  }, []);

  const handleServiceClick = (service: Service) => {
    setActiveService(service);
  };

  return (
    <div className="services-hero-container">
      <div className="services-buttons flex flex-col">
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() => handleServiceClick(service)}
            className={`service-button ${
              activeService?._id === service._id
                ? "font-bold text-black"
                : "text-gray-500"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>
      {activeService && (
        <div className="service-details">
          {activeService.image?.asset?._ref && (
            <img
              src={urlForImage(activeService.image).url()}
              alt={activeService.title}
              className="service-image"
            />
          )}
          <h3 className="service-heading">{activeService.title}</h3>
          <p className="service-description">{activeService.description}</p>
        </div>
      )}
    </div>
  );
}
