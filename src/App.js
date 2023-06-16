import "./styles/homepage.scss";
import { API_KEY } from "./helpers/API.js";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  function fetchRoverImage() {
    setLoading(true);
    setImageUrl(null);
    const rover = "perseverance";
    // random sol
    const sol = Math.floor(Math.random() * 1000);
    const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImageUrl(data.photos[0].img_src);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }

  return (
    <div className="homepage">
      <h1>Welcome to the Mars Rover Gallery</h1>
      <p>Explore stunning images captured by the Mars rovers.</p>
      <button className="fetch-button" onClick={() => fetchRoverImage()}>
        Fetch Images
      </button>
      {loading && <h1>Loading...</h1>}
      <div className="image-gallery">{imageUrl && <img src={imageUrl} />}</div>
    </div>
  );
}

export default App;
