import React, { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Shield, Users } from 'lucide-react';
import { Flight } from '../data/flights';
import { airports } from '../data/airports';

interface BookingFlowProps {
  flight: Flight;
  passengers: number;
  onBack: () => void;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ flight, passengers, onBack }) => {
  const [step, setStep] = useState<'passenger' | 'payment' | 'confirmation'>('passenger');
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo[]>(
    Array.from({ length: passengers }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }))
  );
  const [bookingReference, setBookingReference] = useState('');

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const totalPrice = flight.price * passengers;

  const handlePassengerInfoChange = (index: number, field: keyof PassengerInfo, value: string) => {
    const updated = [...passengerInfo];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerInfo(updated);
  };

  const handleContinueToPayment = () => {
    setStep('payment');
  };

  const handlePayment = () => {
    // Generate booking reference
    const ref = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setBookingReference(ref);
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Your flight has been successfully booked</p>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Booking Reference</p>
                  <p className="font-bold text-lg">{bookingReference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Flight</p>
                  <p className="font-semibold">{flight.airline} {flight.flightNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-semibold">
                    {getAirportName(flight.from)} → {getAirportName(flight.to)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg">₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Download Ticket
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Book Another Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Complete Your Booking</h1>
              <p className="text-sm text-gray-500">
                {getAirportName(flight.from)} → {getAirportName(flight.to)} • {flight.airline} {flight.flightNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'passenger' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Passenger Information
                </h2>
                
                <div className="space-y-6">
                  {passengerInfo.map((passenger, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-4">
                        Passenger {index + 1}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) => handlePassengerInfoChange(index, 'firstName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) => handlePassengerInfoChange(index, 'lastName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={passenger.email}
                            onChange={(e) => handlePassengerInfoChange(index, 'email', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) => handlePassengerInfoChange(index, 'phone', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleContinueToPayment}
                  className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  disabled={!passengerInfo.every(p => p.firstName && p.lastName && p.email && p.phone)}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handlePayment}
                  className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Pay ₹{totalPrice.toLocaleString('en-IN')}
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                    {flight.logo}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{flight.airline}</p>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{getAirportName(flight.from)}</span>
                    <span className="font-medium">{getAirportName(flight.to)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{flight.departure}</span>
                    <span>{flight.arrival}</span>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    {flight.duration} • {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Base Price × {passengers}</span>
                  <span>₹{(flight.price * passengers).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};