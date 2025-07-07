import React from 'react';
import { Clock, Plane, Zap, Star } from 'lucide-react';
import { Flight } from '../data/flights';
import { airports } from '../data/airports';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const isPopular = flight.airline === 'IndiGo' || flight.airline === 'Vistara';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
      <div className="p-6">
        {/* Airline Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              {flight.logo}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber} • {flight.aircraft}</p>
            </div>
          </div>
          {isPopular && (
            <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </div>
          )}
        </div>

        {/* Flight Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{flight.departure}</div>
            <div className="text-sm text-gray-500">{getAirportName(flight.from)}</div>
            <div className="text-xs text-gray-400">{flight.from}</div>
          </div>

          <div className="flex-1 mx-6">
            <div className="relative">
              <div className="flex items-center justify-center">
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="mx-2 p-1 bg-blue-100 rounded-full">
                  <Plane className="w-4 h-4 text-blue-600 transform rotate-90" />
                </div>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div className="text-center mt-2">
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  {flight.duration}
                </div>
                <div className="text-xs text-gray-400">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{flight.arrival}</div>
            <div className="text-sm text-gray-500">{getAirportName(flight.to)}</div>
            <div className="text-xs text-gray-400">{flight.to}</div>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-800">{formatPrice(flight.price)}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          
          <button
            onClick={() => onSelect(flight)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] group-hover:shadow-md"
          >
            Select Flight
          </button>
        </div>

        {/* Additional Features */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Zap className="w-3 h-3" />
            Free Cancellation
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star className="w-3 h-3" />
            Earn Rewards
          </div>
        </div>
      </div>
    </div>
  );
};