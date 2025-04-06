import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  RefreshCw, 
  ArrowRight, 
  Loader2,
  Globe2,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Block {
  time: string;
  location: string;
  activities: string[];
  alternative: string[];
}

interface Day {
  date: string;
  blocks: Block[];
}

interface Itinerary {
  tripTitle: string;
  days: Day[];
}

function TourPage() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planningComplete, setPlanningComplete] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://omtours-be.onrender.com/gemini/responses");
                
                // const response = await axios.get("https://omtours-be.onrender.com/gemini/responses");
                let rawData = (response.data as string).trim();
                if (rawData.startsWith("```json")) {
                    rawData = rawData.replace(/^```json\n/, "").replace(/\n```$/, "");
                }
                const parsedData = JSON.parse(rawData);
                setItinerary(parsedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

  const handleAcceptBlock = () => {
    if (!itinerary || !itinerary.days[currentDayIndex]?.blocks[currentBlockIndex]) return;

    const currentBlock = itinerary.days[currentDayIndex].blocks[currentBlockIndex];
    setSelectedBlocks((prev) => [...prev, currentBlock]);

    if (currentBlockIndex < itinerary.days[currentDayIndex].blocks.length - 1) {
      setCurrentBlockIndex((prev) => prev + 1);
    } else if (currentDayIndex < itinerary.days.length - 1) {
      setCurrentDayIndex((prev) => prev + 1);
      setCurrentBlockIndex(0);
    } else {
      setPlanningComplete(true);
    }
  };

  const handleRegenerateBlock = async () => {
    if (!itinerary || !itinerary.days[currentDayIndex]?.blocks[currentBlockIndex]) return;

    const currentDay = itinerary.days[currentDayIndex];
    const currentBlock = currentDay.blocks[currentBlockIndex];

    try {
      setRegenerating(true);
      const response = await axios.post<Block>("https://omtours-be.onrender.com/gemini/regenerate", {
        previousBlocks: selectedBlocks,
        date: currentDay.date,
        time: currentBlock.time,
      });

      if (!response.data) {
        throw new Error("Invalid response for regeneration");
      }

      setItinerary((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          days: prev.days.map((day, dayIndex) =>
            dayIndex === currentDayIndex
              ? {
                  ...day,
                  blocks: day.blocks.map((block, blockIndex) =>
                    blockIndex === currentBlockIndex ? response.data : block
                  ),
                }
              : day
          ),
        };
      });
    } catch (error) {
      console.error("Error regenerating block:", error);
      setError("Failed to regenerate block. Please try again.");
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <Loader2 className="w-20 h-20 text-sky-500 animate-spin absolute" />
            <Globe2 className="w-12 h-12 text-sky-700 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Creating Your Journey</h2>
          <p className="text-lg text-gray-600">Crafting the perfect itinerary for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
          <p className="text-gray-600 mb-8">Don't worry, we can help you create a new plan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!itinerary || itinerary.days.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Globe2 className="w-16 h-16 text-sky-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Itinerary Found</h2>
          <p className="text-gray-600 mb-8">Let's start by creating your perfect travel plan.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors text-lg font-semibold"
          >
            Create New Plan
          </button>
        </div>
      </div>
    );
  }

  if (planningComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <nav className="bg-white shadow-md backdrop-blur-md bg-white/90 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <Globe2 className="w-6 h-6 text-sky-500" />
                <span className="text-xl font-bold text-gray-900">Om Tours</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey is Ready!</h2>
              <p className="text-lg text-gray-600">Here's your personalized travel itinerary</p>
            </div>
            
            <div className="space-y-8">
              {selectedBlocks.map((block, index) => (
                <div key={index} className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">{block.time}</span>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{block.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900 mb-3">Activities:</h4>
                    <ul className="space-y-2">
                      {block.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-2 text-gray-700">
                          <ChevronRight className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-sky-500 text-white px-8 py-4 rounded-xl hover:bg-sky-600 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                Plan Another Adventure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentBlock = itinerary.days[currentDayIndex]?.blocks[currentBlockIndex];

  if (!currentBlock) {
    return <div>No more blocks available.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <nav className="bg-white shadow-md backdrop-blur-md bg-white/90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-sky-500" />
              <span className="text-xl font-bold text-gray-900">Om Tours</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{itinerary.tripTitle}</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sky-700">
            <Calendar className="w-5 h-5" />
            <span>Day {currentDayIndex + 1} of {itinerary.days.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {format(new Date(itinerary.days[currentDayIndex].date), "MMMM d, yyyy")}
              </h2>
              <span className="text-gray-600">{currentBlock.time}</span>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mt-1">
                <MapPin className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{currentBlock.location}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Planned Activities:</h4>
                    <ul className="space-y-2">
                      {currentBlock.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <ChevronRight className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentBlock.alternative.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Alternative Options:</h4>
                      <ul className="space-y-2">
                        {currentBlock.alternative.map((alt, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <ChevronRight className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                            <span>{alt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleAcceptBlock}
              className="flex items-center justify-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-xl hover:bg-sky-600 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              <Check className="w-5 h-5" />
              Accept Plan
            </button>
            
            <button
              onClick={handleRegenerateBlock}
              disabled={regenerating}
              className="flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold text-lg"
            >
              {regenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Regenerate
                </>
              )}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span>{selectedBlocks.length} blocks planned</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Next:</span>
                <span className="font-medium text-gray-900">
                  {currentBlockIndex < itinerary.days[currentDayIndex].blocks.length - 1
                    ? `${itinerary.days[currentDayIndex].blocks[currentBlockIndex + 1].time}`
                    : currentDayIndex < itinerary.days.length - 1
                    ? "Next Day"
                    : "Complete Plan"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPage;