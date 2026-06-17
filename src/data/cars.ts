export interface Car {
  id: string;
  name: string;
  pricePerDay: number;
  transmission: 'BVM' | 'BVA';
  fuel: 'Diesel' | 'Essence';
  seats: number;
  imagePath: string;
  ac: boolean;
}

export const fleetCars: Car[] = [
  {
    id: 'dacia-logan',
    name: 'Dacia Logan',
    pricePerDay: 300,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/logan.png',
    ac: true,
  },
  {
    id: 'renault-clio',
    name: 'Renault Clio 5',
    pricePerDay: 350,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/clio5.png',
    ac: true,
  },
  {
    id: 'hyundai-accent',
    name: 'Hyundai Accent',
    pricePerDay: 450,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/accent.png',
    ac: true,
  },
  {
    id: 'dacia-duster',
    name: 'Dacia Duster',
    pricePerDay: 500,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/duster.png',
    ac: true,
  },
  {
    id: 'range-rover-evoque',
    name: 'Range Rover Evoque',
    pricePerDay: 1200,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/evoque.png',
    ac: true,
  }
];
