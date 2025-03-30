import axios from "axios";
import { useEffect, useState } from "react";

interface TourGuide {
    days: {
        date: string;
        blocks: {
            time: string;
            location: string;
            duration: string;
            activities: string[];
            alternative: string[];
        }[];
    }[];
}

function TourPage() {
    const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/gemini/responses");
                let rawData = (response.data as string).trim();
                if (rawData.startsWith("```json")) {
                    rawData = rawData.replace(/^```json\n/, "").replace(/\n```$/, "");
                }
                const parsedData = JSON.parse(rawData);
                setTourGuide(parsedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
    }

    if (!tourGuide) {
        return <div className="text-center text-red-500">Failed to load itinerary.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Tour Itinerary</h1>
            <div className="grid gap-6">
                {tourGuide.days.map((day, index) => (
                    <div key={index} className="border border-gray-300 p-5 rounded-lg shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Day {index + 1} - {day.date}</h2>
                        <div className="space-y-4">
                            {day.blocks.map((block, bIndex) => (
                                <div key={bIndex} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-lg font-semibold text-gray-800">{block.time} - {block.location}</h3>
                                    <p className="text-sm text-gray-600">Duration: {block.duration}</p>
                                    <ul className="list-disc ml-6 text-gray-800 mt-2">
                                        {block.activities.map((activity, aIndex) => (
                                            <li key={aIndex}>{activity}</li>
                                        ))}
                                    </ul>
                                    {block.alternative.length > 0 && (
                                        <div className="mt-2 text-gray-700 text-sm p-2 rounded-md">
                                            <strong>Alternative:</strong>
                                            <ul className="list-disc ml-5">
                                                {block.alternative.map((alt, altIndex) => (
                                                    <li key={altIndex}>{alt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TourPage;
