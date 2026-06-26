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
    imagePath: '/images/cars/dacia-logan.jpg',
    ac: true,
  },
  {
    id: 'dacia-sandero',
    name: 'Dacia Sandero',
    pricePerDay: 300,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/DACIA-Sandero.jpg',
    ac: true,
  },
  {
    id: 'renault-clio5-bvm',
    name: 'Renault Clio 5',
    pricePerDay: 350,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/renault-clio5.jpg',
    ac: true,
  },
  {
    id: 'renault-clio5-bva',
    name: 'Renault Clio 5 Automatique',
    pricePerDay: 400,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/clio5-automatique.jpg',
    ac: true,
  },
  {
    id: 'peugeot-208',
    name: 'Peugeot 208',
    pricePerDay: 350,
    transmission: 'BVM',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/peugeot-208.jpg',
    ac: true,
  },
  {
    id: 'fiat-500',
    name: 'Fiat 500',
    pricePerDay: 300,
    transmission: 'BVA',
    fuel: 'Essence',
    seats: 4,
    imagePath: '/images/cars/fiat 500.jpg',
    ac: true,
  },
  {
    id: 'vw-troc',
    name: 'Volkswagen T-Roc',
    pricePerDay: 700,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/volkswagen-t-roc.jpg',
    ac: true,
  },
  {
    id: 'hyundai-tucson',
    name: 'Hyundai Tucson',
    pricePerDay: 700,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/hyundai-tucson.png',
    ac: true,
  },
  {
    id: 'cupra-formentor',
    name: 'Cupra Formentor',
    pricePerDay: 900,
    transmission: 'BVA',
    fuel: 'Diesel',
    seats: 5,
    imagePath: '/images/cars/cupra-formentor.jpg',
    ac: true,
  },
];