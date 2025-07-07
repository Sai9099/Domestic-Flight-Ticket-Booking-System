import React, { useState } from 'react';
import { Plane, MapPin, Star } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { FlightResults } from './components/FlightResults';
import { BookingFlow } from './components/BookingFlow';
import { generateFlights, Flight } from './data/flights';

type AppState = 'search' | 'results' | 'booking';

interface SearchData {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'oneWay' | 'roundTrip';
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('search');
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    const generatedFlights = generateFlights(data.from, data.to, data.departureDate);
    setFlights(generatedFlights);
    setCurrentState('results');
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentState('booking');
  };

  const handleBackToSearch = () => {
    setCurrentState('search');
    setSearchData(null);
    setFlights([]);
    setSelectedFlight(null);
  };

  const handleBackToResults = () => {
    setCurrentState('results');
    setSelectedFlight(null);
  };

  if (currentState === 'booking' && selectedFlight && searchData) {
    return (
      <BookingFlow
        flight={selectedFlight}
        passengers={searchData.passengers}
        onBack={handleBackToResults}
      />
    );
  }

  if (currentState === 'results' && searchData) {
    return (
      <FlightResults
        flights={flights}
        searchData={searchData}
        onBack={handleBackToSearch}
        onSelectFlight={handleSelectFlight}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SkyBooker</h1>
                <p className="text-sm text-gray-500">Book flights across India</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Flights</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">My Bookings</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Support</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore India with <span className="text-blue-600">Ease</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book domestic flights across India with the best prices and seamless experience
          </p>
        </div>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">150+ Destinations</h3>
            <p className="text-gray-600 text-sm">Connect to major cities and towns across India</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">Get competitive prices from all major airlines</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Plane className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Simple and secure booking process in minutes</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SkyBooker</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for domestic flight bookings across India
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block">Flight Status</a>
                <a href="#" className="text-gray-400 hover:text-white block">Manage Booking</a>
                <a href="#" className="text-gray-400 hover:text-white block">Check-in</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white block">Contact Us</a>
                <a href="#" className="text-gray-400 hover:text-white block">Feedback</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white block">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white block">Cancellation Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 SkyBooker. All rights reserved. Made with ❤️ for travelers in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;