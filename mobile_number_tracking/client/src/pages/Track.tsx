import React, { useState } from 'react';
import axios from 'axios';
import { Phone, MapPin, Info } from 'lucide-react';

type TrackingData = {
  Location: string;
  Carrier: string;
  Latitude: number;
  Longitude: number;
  State: string;
  District: string;
  Pincode: string;
  Error?: string;
};

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  // Add more countries as needed
];

const Track: React.FC = () => {
  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const response = await axios.post('http://127.0.0.1:5000/track', {
        number: fullPhoneNumber,
      });

      if (response.data.success) {
        setTrackingData(response.data.data);
      } else if (response.data.error) {
        setError(response.data.error);
      } else if (response.data.data?.Error) {
        setTrackingData(response.data.data);
        setError(response.data.data.Error);
      } else {
        setError('Failed to track number');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const renderMap = () => {
    if (!trackingData) {
      return (
        <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No tracking data available.</p>
          </div>
        </div>
      );
    }

    const { Latitude, Longitude } = trackingData;

    return (
      <iframe
        width="100%"
        height="400"
        src={`https://www.google.com/maps?q=${Latitude},${Longitude}&output=embed`}
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Phone className="mr-2" />
              Track Phone Number
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="country-code" className="block text-sm font-medium text-gray-700">
                  Country Code
                </label>
                <select
                  id="country-code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.country} ({country.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Tracking...' : 'Track Number'}
              </button>
            </form>
          </div>

          {trackingData && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="mr-2" />
                Tracking Results
              </h3>
              <div className="space-y-2">
                <p><span className="font-medium">Location:</span> {trackingData.Location || 'Not Available'}</p>
                <p><span className="font-medium">Carrier:</span> {trackingData.Carrier || 'Not Available'}</p>
                <p><span className="font-medium">State:</span> {trackingData.State || 'Not Available'}</p>
                <p><span className="font-medium">District:</span> {trackingData.District || 'Not Available'}</p>
                <p><span className="font-medium">Pincode:</span> {trackingData.Pincode || 'Not Available'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2" />
            Location Map
          </h3>
          {renderMap()}
        </div>
      </div>
    </div>
  );
};

export default Track;
