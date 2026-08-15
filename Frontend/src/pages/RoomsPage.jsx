import { useEffect, useState } from "react"; // Added React hooks
import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Rooms, GoodToKnow } from "../components/Sections";

export default function RoomsPage() {
  // 1. Create a state to hold the rooms data from Flask
  const [roomsData, setRoomsData] = useState([]);

  // 2. Fetch the data when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRoomsData(data); // Save the data to state
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []); // Empty array means this runs once when the page loads

  return (
    <>
      <PageHero title="Rooms & Suites" subtitle="03 — Three quiet rooms" image={IMG.room2} />
      
      {/* 3. Pass the fetched data to your Rooms component */}
      <Rooms roomsData={roomsData} />
      
      <GoodToKnow />
    </>
  );
}