import React, { useState } from 'react';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { Flight } from '../data/flights';
import { airports } from '../data/airports';
import { FlightCard } from './FlightCard';
import { formatDisplayDate } from '../utils/dateUtils';

interface FlightResultsProps {
  flights: Flight[];
  searchData: {
    from: string;
    to: string;
    departureDate: string;
    passengers: number;
  };
  onBack: () => void;
  onSelectFlight: (flight: Flight) => void;
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  searchData,
  onBack,
  onSelectFlight
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'departure' | 'duration'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'departure':
        return a.departure.localeCompare(b.departure);
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {getAirportName(searchData.from)} → {getAirportName(searchData.to)}
                </h1>
                <p className="text-sm text-gray-500">
                  {formatDisplayDate(searchData.departureDate)} • {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 bg-white rounded-xl shadow-sm p-6 h-fit">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              
              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sort by</h4>
                <div className="space-y-2">
                  {[
                    { value: 'price', label: 'Price (Low to High)' },
                    { value: 'departure', label: 'Departure Time' },
                    { value: 'duration', label: 'Flight Duration' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as any)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Airlines</h4>
                <div className="space-y-2">
                  {['IndiGo', 'Air India', 'SpiceJet', 'Vistara'].map(airline => (
                    <label key={airline} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-600">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Flight Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {flights.length} flights found
              </h2>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="price">Price</option>
                  <option value="departure">Departure Time</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {sortedFlights.map(flight => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onSelect={onSelectFlight}
                />
              ))}
            </div>

            {flights.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Plane className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No flights found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};