export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estimatedDays: string;
  description: string;
}

export interface DeliveryConfig {
  zones: DeliveryZone[];
  defaultZoneId: string;
  packagingNote: string;
  qualityCheckNote: string;
}

export const DELIVERY_CONFIG: DeliveryConfig = {
  zones: [
    {
      id: 'dhaka',
      name: 'Inside Dhaka City',
      fee: 60,
      estimatedDays: '1-2 Business Days',
      description: 'Doorstep Courier Delivery (Pathao / Paperfly / Steadfast)',
    },
    {
      id: 'outside-dhaka',
      name: 'Outside Dhaka / Nationwide',
      fee: 120,
      estimatedDays: '2-4 Business Days',
      description: 'Standard Nationwide Delivery across all 64 districts',
    },
  ],
  defaultZoneId: 'dhaka',
  packagingNote: 'Eco-grade protective bubble wrap & custom rigid packaging',
  qualityCheckNote: 'Pre-dispatch dimensional inspection & layer-integrity verification',
};

export function getDeliveryZone(zoneId?: string): DeliveryZone {
  return (
    DELIVERY_CONFIG.zones.find((z) => z.id === zoneId) ||
    DELIVERY_CONFIG.zones[0]
  );
}
