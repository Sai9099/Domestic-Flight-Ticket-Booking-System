export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  logo: string;
}

export const airlines = [
  { code: '6E', name: 'IndiGo', logo: '🔵' },
  { code: 'AI', name: 'Air India', logo: '🔴' },
  { code: 'SG', name: 'SpiceJet', logo: '🟡' },
  { code: 'UK', name: 'Vistara', logo: '🟣' },
  { code: 'I5', name: 'AirAsia India', logo: '🔴' },
  { code: 'G8', name: 'GoAir', logo: '🟢' }
];

export const generateFlights = (from: string, to: string, date: string): Flight[] => {
  const baseFlights = [
    {
      airline: 'IndiGo',
      flightNumber: '6E-2345',
      departure: '06:30',
      arrival: '08:45',
      duration: '2h 15m',
      basePrice: 4500,
      stops: 0,
      aircraft: 'Airbus A320',
      logo: '🔵'
    },
    {
      airline: 'Air India',
      flightNumber: 'AI-131',
      departure: '09:15',
      arrival: '11:30',
      duration: '2h 15m',
      basePrice: 5200,
      stops: 0,
      aircraft: 'Boeing 737',
      logo: '🔴'
    },
    {
      airline: 'SpiceJet',
      flightNumber: 'SG-8149',
      departure: '12:45',
      arrival: '15:00',
      duration: '2h 15m',
      basePrice: 4200,
      stops: 0,
      aircraft: 'Boeing 737 MAX',
      logo: '🟡'
    },
    {
      airline: 'Vistara',
      flightNumber: 'UK-955',
      departure: '16:20',
      arrival: '18:35',
      duration: '2h 15m',
      basePrice: 5800,
      stops: 0,
      aircraft: 'Airbus A320neo',
      logo: '🟣'
    },
    {
      airline: 'AirAsia India',
      flightNumber: 'I5-1505',
      departure: '19:10',
      arrival: '21:25',
      duration: '2h 15m',
      basePrice: 3900,
      stops: 0,
      aircraft: 'Airbus A320',
      logo: '🔴'
    },
    {
      airline: 'GoAir',
      flightNumber: 'G8-2135',
      departure: '21:45',
      arrival: '00:00+1',
      duration: '2h 15m',
      basePrice: 4100,
      stops: 0,
      aircraft: 'Airbus A320neo',
      logo: '🟢'
    }
  ];

  return baseFlights.map((flight, index) => ({
    id: `${from}-${to}-${date}-${index}`,
    ...flight,
    from,
    to,
    price: flight.basePrice + Math.floor(Math.random() * 2000) - 1000
  }));
};