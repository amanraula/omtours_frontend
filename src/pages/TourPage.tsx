import axios from "axios";

async function TourPage() {
    const tourGuide = await axios.get('http://localhost:gemini/responses');
    console.log(tourGuide);
    return (
        <div>
        <h1>Tour Page</h1>
        {/* <p>{tourGuide}</p> */}
        </div>
    );
}
export default TourPage;