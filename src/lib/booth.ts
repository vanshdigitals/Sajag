import { safeValidate, pinCodeSchema, coordinatesSchema } from './validators';
import { NotFoundError, ValidationError } from './errors';

export interface Booth {
  id: string;
  name: string;
  address: string;
  pinCode: string;
  lat: number;
  lng: number;
  accessibility: {
    wheelchair: boolean;
    ramp: boolean;
    assistance: boolean;
  };
}

const mockBooths: Booth[] = [
  {
    id: 'b1',
    name: 'Govt Boys Senior Secondary School',
    address: 'Connaught Place, New Delhi',
    pinCode: '110001',
    lat: 28.6315,
    lng: 77.2167,
    accessibility: { wheelchair: true, ramp: true, assistance: true },
  },
  {
    id: 'b2',
    name: 'NDMC Primary School',
    address: 'Gole Market, New Delhi',
    pinCode: '110001',
    lat: 28.6334,
    lng: 77.2023,
    accessibility: { wheelchair: false, ramp: true, assistance: false },
  },
  {
    id: 'b3',
    name: 'St. Xaviers High School',
    address: 'Fort, Mumbai',
    pinCode: '400001',
    lat: 18.9322,
    lng: 72.8264,
    accessibility: { wheelchair: true, ramp: true, assistance: true },
  },
];

/**
 * Calculates the great-circle distance between two points on the Earth's surface using the Haversine formula.
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return parseFloat((R * c).toFixed(2));
}

/**
 * Finds all polling booths matching a specific PIN code.
 */
export function findBoothsByPin(pinCode: string): Booth[] {
  const validation = safeValidate(pinCodeSchema, pinCode);
  if (!validation.success) {
    throw new ValidationError(validation.errors.join(', '));
  }

  const results = mockBooths.filter(b => b.pinCode === validation.data);
  if (results.length === 0) {
    throw new NotFoundError(`No booths found for PIN code ${validation.data}`);
  }

  return results;
}

/**
 * Finds polling booths near a specific geographic coordinate.
 */
export function findNearestBooths(lat: number, lng: number, radiusKm: number = 5): Booth[] {
  const validation = safeValidate(coordinatesSchema, { lat, lng });
  if (!validation.success) {
    throw new ValidationError(validation.errors.join(', '));
  }

  if (typeof radiusKm !== 'number' || radiusKm <= 0) {
    throw new ValidationError('Radius must be a positive number');
  }

  const results = mockBooths
    .map(booth => ({
      ...booth,
      distance: calculateDistance(validation.data.lat, validation.data.lng, booth.lat, booth.lng),
    }))
    .filter(booth => booth.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);

  if (results.length === 0) {
    throw new NotFoundError('No booths found within the specified radius');
  }

  // Remove the temporary distance property for the return type if strictness is preferred, 
  // but it's usually helpful for UI.
  return results;
}

/**
 * Checks if a given PIN code falls into a known valid area.
 */
export function isValidPinArea(pinCode: string): boolean {
  const validation = safeValidate(pinCodeSchema, pinCode);
  if (!validation.success) return false;
  
  // In a real app, this would query a database of known service areas.
  return mockBooths.some(b => b.pinCode === validation.data);
}
