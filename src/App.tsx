import React, { JSX, useRef } from 'react';
import { Routes, Route, useNavigate, NavigateFunction } from 'react-router-dom';
import { Globe2, ChevronLeft, ChevronRight, Star, MessageSquareText, Sliders, Map, Calendar, RefreshCw, Quote } from 'lucide-react';
import PlanningForm from './components/PlanningForm';

interface TopPlace {
  name: string;
  image: string;
  description: string;
}

interface Review {
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
  trip: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

interface ReviewCardProps {
  review: Review;
}

interface HomePageProps {
  navigate: NavigateFunction;
}

function App(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage navigate={navigate} />} />
      <Route path="/plan" element={<PlanningForm />} />
    </Routes>
  );
}

function HomePage({ navigate }: HomePageProps): JSX.Element {
  const topPlacesRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null>): void => {
      const container = ref.current;
      if (container) {
        const scrollAmount = direction === 'left' ? -400 : 400;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

  const topPlaces: TopPlace[] = [
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
      description: "Iconic white-washed buildings and stunning sunsets"
    },
    {
      name: "Machu Picchu, Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80",
      description: "Ancient Incan citadel in the Andes Mountains"
    },
    {
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
      description: "Traditional temples and beautiful cherry blossoms"
    },
    {
      name: "Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80",
      description: "Crystal clear waters and overwater bungalows"
    },
    {
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80",
      description: "Majestic mountains and scenic hiking trails"
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
      description: "Tropical paradise with rich culture and beaches"
    }
  ];

  const reviews: Review[] = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      text: "Om Tours made planning our honeymoon so effortless! The AI suggestions were spot-on, and we discovered hidden gems we would have never found otherwise.",
      rating: 5,
      trip: "Maldives Honeymoon"
    },
    {
      name: "Rahul Verma",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      text: "The real-time updates during our trip were invaluable. When it rained in Bali, the AI instantly suggested indoor activities and rearranged our schedule.",
      rating: 5,
      trip: "Bali Adventure"
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      text: "Perfect family trip to Himachal! The AI considered our children's ages and energy levels while planning activities. Couldn't have planned it better ourselves.",
      rating: 5,
      trip: "Himachal Family Tour"
    },
    {
      name: "Vikram Singh",
      location: "Jaipur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      text: "The personalized food recommendations were amazing! Every restaurant suggested matched our taste and budget perfectly.",
      rating: 5,
      trip: "Kerala Backwaters"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80"
            alt="Beautiful landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Perfect Journey Begins with <span className="text-sky-400">Om Tours</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            AI-Powered Travel Planning That Adapts to Your Dreams
          </p>
          <button 
            onClick={() => navigate('/plan')}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
            Plan Your Adventure
          </button>
        </div>
      </header>

      {/* Top Places Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Top Destinations to Explore
          </h2>
          
          <div className="relative group">
            <button 
              onClick={() => scroll('left', topPlacesRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div 
              ref={topPlacesRef}
              className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {topPlaces.map((place, index) => (
                <div 
                  key={index}
                  className="flex-none w-80 group/card"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                      <p className="text-sm text-gray-200">{place.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => scroll('right', topPlacesRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Experience Smart Travel Planning
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sliders className="w-8 h-8 text-sky-500" />}
              title="AI-Powered Personalization"
              description="Get tailored travel recommendations based on your preferences, past trips, and travel style."
            />
            <FeatureCard
              icon={<RefreshCw className="w-8 h-8 text-sky-500" />}
              title="Real-Time Adjustments"
              description="Dynamic itinerary updates based on weather, events, and local conditions."
            />
            <FeatureCard
              icon={<MessageSquareText className="w-8 h-8 text-sky-500" />}
              title="Seamless Input"
              description="Natural conversation interface to understand your travel preferences and requirements."
            />
            <FeatureCard
              icon={<Map className="w-8 h-8 text-sky-500" />}
              title="Interactive Maps"
              description="Visualize your journey with detailed routes, points of interest, and travel times."
            />
            <FeatureCard
              icon={<Star className="w-8 h-8 text-sky-500" />}
              title="Verified Reviews"
              description="Access curated reviews from real travelers to make informed decisions."
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-sky-500" />}
              title="Smart Scheduling"
              description="Optimal timing suggestions for attractions, restaurants, and activities."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-sky-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            How Om Tours Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Share Your Dreams"
              description="Tell us about your ideal trip through our intuitive chat interface."
            />
            <Step
              number="2"
              title="AI Magic"
              description="Our AI analyzes thousands of options to create your perfect itinerary."
            />
            <Step
              number="3"
              title="Travel with Confidence"
              description="Enjoy your personalized journey with real-time support and updates."
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Travelers Say
          </h2>
          
          <div className="relative group">
            <button 
              onClick={() => scroll('left', reviewsRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div 
              ref={reviewsRef}
              className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex-none w-96">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => scroll('right', reviewsRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-sky-100">
            Join thousands of happy travelers who have discovered their perfect adventures with Om Tours
          </p>
          <button 
            onClick={() => navigate('/plan')}
            className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-100 transition-all transform hover:scale-105">
            Begin Your Adventure
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-6 h-6 text-sky-400" />
              <span className="text-xl font-bold text-white">Om Tours</span>
            </div>
            <p className="text-sm">
              AI-powered travel planning for the modern explorer.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>AI Personalization</li>
              <li>Real-time Updates</li>
              <li>Interactive Maps</li>
              <li>Travel Reviews</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: StepProps): JSX.Element {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all h-full">
      <div className="flex items-start gap-4">
        <img 
          src={review.image} 
          alt={review.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>
      </div>
      <div className="mt-4">
        <Quote className="w-8 h-8 text-sky-200 mb-2" />
        <p className="text-gray-600">{review.text}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <span className="text-sm text-gray-500">{review.trip}</span>
      </div>
    </div>
  );
}

export default App;