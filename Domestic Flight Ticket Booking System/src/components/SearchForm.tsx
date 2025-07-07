import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import { airports, popularRoutes } from '../data/airports';
import { getTomorrowDate, getNextWeekDate } from '../utils/dateUtils';

interface SearchFormProps {
  onSearch: (searchData: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    tripType: 'oneWay' | 'roundTrip';
  }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('BOM');
  const [departureDate, setDepartureDate] = useState(getTomorrowDate());
  const [returnDate, setReturnDate] = useState(getNextWeekDate());
  const [passengers, setPassengers] = useState(1);

  const handleSwapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      from,
      to,
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : undefined,
      passengers,
      tripType
    });
  };

  const getAirportLabel = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? `${airport.city} (${airport.code})` : code;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="text-blue-600 w-8 h-8" />
        <h2 className="text-2xl font-bold text-gray-800">Book Your Flight</h2>
      </div>

      {/* Trip Type Selection */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTripType('oneWay')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            tripType === 'oneWay'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => setTripType('roundTrip')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            tripType === 'roundTrip'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Round Trip
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        {/* From/To Selection */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} - {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="button"
              onClick={handleSwapAirports}
              className="p-3 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
            >
              <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} - {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Passenger Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Departure Date
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={getTomorrowDate()}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>

          {tripType === 'roundTrip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Routes</h3>
          <div className="flex flex-wrap gap-2">
            {popularRoutes.map(route => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                onClick={() => {
                  setFrom(route.from);
                  setTo(route.to);
                }}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};