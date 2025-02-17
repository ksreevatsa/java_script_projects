import './App.css';
import searchImage from "./images/search.png"
import rainImage from "./images/rain.png"
import humidtyImage from "./images/humidity.png"
import windImage from "./images/wind.png"
import clearImage from "./images/clear.png"
import drizzleImage from "./images/drizzle.png"
import cloudsImage from "./images/clouds.png"
import mistImage from "./images/mist.png"
import {useState,useEffect} from 'react';

function App() {
  const apiKey="9ee68d4c778558987941281c8dc0b934";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
  const [weatherImage,setWeatherImage]=useState("");
  const [weather,setWeather]=useState(null);
  const [city,setCity]=useState("");
  
    const fetchWeather = async () => {
      if (!city) return;
      try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert("City not found!");
          setWeather({});
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    
    useEffect(() => {
      if (!weather?.weather) return;
  
      switch (weather.weather[0].main) {
        case "Rain":
          setWeatherImage(rainImage);
          break;
        case "Clouds":
          setWeatherImage(cloudsImage);
          break;
        case "Clear":
          setWeatherImage(clearImage);
          break;
        case "Drizzle":
          setWeatherImage(drizzleImage);
          break;
        case "Mist":
          setWeatherImage(mistImage);
          break;
        default:
          setWeatherImage(rainImage);
          break;
      }
    }, [weather]);
   
  return (
    <div className="flex-col h-screen items-start justify-center w-[90%] max-w-[470px] bg-gradient-to-br from-[#00feba] to-[#5b548a] text-white mx-auto mt-[100px] rounded-[20px] p-[40px] text-center">
      <div className="search space-x-3">
        <input type="text" value={city} className="border-2 border-white rounded-xl h-8 w-72 text-black" placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)}/>
        <button onClick={fetchWeather}><img src={searchImage} className="h-5 w-5"/></button>
      </div>
      <div className="weather flex flex-col justify-center items-center">
           <img src={weatherImage} className="h-36 w-36"/>
           <h1 className="temp font-bold text-6xl">{Math.round(weather?.main?.temp)}°c</h1>
           <h1 className="city font-bold text-3xl my-2">{weather?.name}</h1>


           <div className="flex gap-20 my-7">
           <div className=" flex  flex-col justify-center my-5">
              <img src={humidtyImage} className="h-12 w-12"/>
              <div className= "flex-col gap-3 my-3">
                    <p className="humidity">{weather?.main?.humidity} %</p>
                    <p className="">humidity</p>
              </div>
            </div>
            <div className="flex  flex-col justify-center my-5">
              <img src={windImage} className="h-12 w-12"/>
              <div className= "flex-col gap-3 my-3">
                    <p className="wind">{weather?.wind?.speed} km/hr</p>
                    <p className="">wind speed</p>
              </div>
            </div>
           </div>
      </div>
    </div>
  );
}

export default App;
