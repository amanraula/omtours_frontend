import axios from "axios";
import { useEffect, useState } from "react";

function TourPage() {
    const [tourGuide, setTourGuide] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<string[]>("http://localhost:8000/gemini/responses");
                setTourGuide(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the function when component mounts
    }, []); 
    console.log(tourGuide);
    return (
        <div>
            <h1>Tour Page</h1>
            <p>{tourGuide}</p>
        </div>
    );
}

export default TourPage;
