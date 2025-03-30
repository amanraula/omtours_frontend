import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Globe2, Home } from 'lucide-react';
import ErrorPage from './ErrorPage';

interface Location {
  name: string;
  image: string;
  description: string;
  highlights: string[];
}

interface Country extends Location {
  cities: Location[];
}

interface State extends Location {
  cities: Location[];
}

const COUNTRIES: Country[] = [
  {
    name: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    description: "Experience the romance of Paris, the wine regions of Bordeaux, and the French Riviera",
    highlights: ["Eiffel Tower", "Louvre Museum", "Palace of Versailles", "French Riviera"],
    cities: [
      {
        name: "Paris",
        image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80",
        description: "The City of Light, known for its art, culture, and iconic landmarks",
        highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées"]
      },
      {
        name: "Nice",
        image: "https://images.unsplash.com/photo-1533614767211-c4f6a09a148c?auto=format&fit=crop&q=80",
        description: "Beautiful coastal city on the French Riviera",
        highlights: ["Promenade des Anglais", "Old Town", "Castle Hill", "Mediterranean Beaches"]
      }
    ]
  },
  {
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
    description: "Blend of ancient traditions and cutting-edge technology",
    highlights: ["Mount Fuji", "Imperial Palace", "Traditional Temples", "Cherry Blossoms"],
    cities: [
      {
        name: "Tokyo",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80",
        description: "A dazzling mix of modern technology and traditional culture",
        highlights: ["Shibuya Crossing", "Tokyo Tower", "Imperial Palace", "Senso-ji Temple"]
      },
      {
        name: "Kyoto",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
        description: "Japan's cultural heart with numerous temples and gardens",
        highlights: ["Kinkaku-ji", "Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Gion District"]
      }
    ]
  }
];

const STATES: State[] = [
  {
    name: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80",
    description: "Land of Kings, known for its majestic forts and vibrant culture",
    highlights: ["Historic Forts", "Desert Safaris", "Palace Hotels", "Traditional Arts"],
    cities: [
      {
        name: "Jaipur",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80",
        description: "The Pink City, famous for its colorful architecture and royal heritage",
        highlights: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar"]
      },
      {
        name: "Udaipur",
        image: "https://images.unsplash.com/photo-1464095557391-7c982f990e2d?auto=format&fit=crop&q=80",
        description: "The City of Lakes, known for its romantic setting and palaces",
        highlights: ["Lake Palace", "City Palace", "Lake Pichola", "Sajjangarh Palace"]
      }
    ]
  },
  {
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80",
    description: "God's Own Country, featuring backwaters and lush landscapes",
    highlights: ["Backwaters", "Tea Plantations", "Beach Resorts", "Ayurveda"],
    cities: [
      {
        name: "Kochi",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80",
        description: "Historic coastal city with diverse cultural influences",
        highlights: ["Chinese Fishing Nets", "Fort Kochi", "Jewish Synagogue", "Dutch Palace"]
      },
      {
        name: "Munnar",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80",
        description: "Hill station known for its tea plantations and cool climate",
        highlights: ["Tea Gardens", "Eravikulam National Park", "Top Station", "Tea Museum"]
      }
    ]
  }
];

interface BreadcrumbProps {
  state?: string | null;
  city?: string | null;
  country?: string | null;
}

function Breadcrumb({ state, city, country }: BreadcrumbProps) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
      <button
        onClick={() => handleClick('/')}
        className="flex items-center hover:text-sky-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </button>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      {country ? (
        <>
          <button
            onClick={() => handleClick(`/location?country=${country}`)}
            className="hover:text-sky-600 transition-colors flex items-center"
          >
            <Globe2 className="w-4 h-4 mr-1" />
            {country}
          </button>
          
          {city && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {city}
              </span>
            </>
          )}
        </>
      ) : state && (
        <>
          <button
            onClick={() => handleClick('/')}
            className="hover:text-sky-600 transition-colors"
          >
            India
          </button>
          
          <ChevronRight className="w-4 h-4 text-gray-400" />
          
          <button
            onClick={() => handleClick(`/location?state=${state}`)}
            className="hover:text-sky-600 transition-colors"
          >
            {state}
          </button>
          
          {city && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {city}
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
}

function LocationView() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const country = searchParams.get("country");

  if (country && city) {
    const countryData = COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase());
    const cityData = countryData?.cities.find(c => c.name.toLowerCase() === city.toLowerCase());
    return cityData ? <DetailView location={cityData} country={country} city={city} /> : <ErrorPage />;
  } else if (country) {
    const countryData = COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase());
    return countryData ? <CountryView country={countryData} /> : <ErrorPage />;
  } else if (state && city) {
    const stateData = STATES.find(s => s.name.toLowerCase() === state.toLowerCase());
    const cityData = stateData?.cities.find(c => c.name.toLowerCase() === city.toLowerCase());
    return cityData ? <DetailView location={cityData} state={state} city={city} /> : <ErrorPage />;
  } else if (state) {
    const stateData = STATES.find(s => s.name.toLowerCase() === state.toLowerCase());
    return stateData ? <StateView state={stateData} /> : <ErrorPage />;
  }

  return <ErrorPage />;
}

function CountryView({ country }: { country: Country }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb country={country.name} />
        
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-5xl font-bold text-white mb-4">{country.name}</h1>
            <p className="text-xl text-gray-200">{country.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {country.cities.map((city) => (
            <div
              key={city.name}
              onClick={() => navigate(`/location?country=${country.name}&city=${city.name}`)}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-gray-200">{city.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StateView({ state }: { state: State }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb state={state.name} />
        
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <img src={state.image} alt={state.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-5xl font-bold text-white mb-4">{state.name}</h1>
            <p className="text-xl text-gray-200">{state.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {state.cities.map((city) => (
            <div
              key={city.name}
              onClick={() => navigate(`/location?state=${state.name}&city=${city.name}`)}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-gray-200">{city.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DetailViewProps {
  location: Location;
  state?: string;
  city?: string;
  country?: string;
}

function DetailView({ location, state, city, country }: DetailViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb state={state} city={city} country={country} />
        
        <div className="relative h-[70vh] rounded-2xl overflow-hidden mb-12">
          <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <h1 className="text-6xl font-bold text-white mb-4">{location.name}</h1>
            <p className="text-2xl text-gray-200">{location.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {location.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-sky-50 rounded-lg">
                <MapPin className="w-6 h-6 text-sky-500" />
                <span className="text-lg text-gray-800">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationView;