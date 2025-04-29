import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get_weather, translateText, dequeue_order } from '../apiCall.js';  // Make sure to import your translateText function
import { GlobalContext } from './GlobalContext';

//Home page with mock language translation
function Home() {
    const [language, setLanguage] = useState("en");  // Default to English
    const [translatedMessage, setTranslatedMessage] = useState("");
    const [weather, setWeather] = useState([]);
    const {setLoginID, setCustomerLoggedIn} = useContext(GlobalContext);
    const aboutEng = "Bruhba Bobruh is dedicated to surpassing customer expectations through carefully crafted and reliable solutions. Established by Alex Pierce, Aaron Mai, Jianwei Gao, and Chris Maldonado, our company is driven by one goal: putting customers at the center of everything we do. With a mission to deliver products that meet your needs at exceptional value and quality, Bruhba Bobruh ensures every order is tailored to your satisfaction. Why wait? Experience Bruhba Bobruh today!";

    // language toggle
    const toggleLanguage = async () => {
        const targetLang = language === "en" ? "es" : "en";  
        setLanguage(targetLang);

        const translated = await translateText(aboutEng, targetLang);
        setTranslatedMessage(translated);
    };

    useEffect(() => {
        setLoginID(0);
        setCustomerLoggedIn("");
        dequeue_order(0);    
        setTranslatedMessage(aboutEng);

        const fetchWeather = async () => {
            const weatherData = await get_weather();
            console.log(weatherData);
            setWeather(weatherData);  
        };
    
        fetchWeather();
    }, []);

    return (
        <center>
            <header className="Header-home">
            <div className="language-toggle">
            <span>ENG</span>
            <label className="switch">
            <input
                type="checkbox"
                onChange={toggleLanguage}
                checked={language === "es"}
            />
            <span className="slider"></span>
            </label>
            <span>SPA</span>
            </div>
            <h1 className = "Bobruh">Bruhba Bobruh Tea</h1>
            {/* display weather info */}
            <p>{Math.round(weather?.current?.temp_f)}°F {weather?.current?.condition?.text} <img src={weather?.current?.condition?.icon}
                   style={{ verticalAlign: "middle", marginLeft: "-15px", marginRight: "-18px", scale: "50%"}}></img> 
                 - {weather?.location?.name}, {weather?.location?.region}</p>
            </header>
            <hr />
            <main>
                <h8 className="about">About Us</h8>
                <p style={{maxWidth: "800px", marginTop: "1vw"}}>{translatedMessage}</p>

                <div className="card-container">
                 <div className="card-wrap">
                <p className="card-label">Customer</p>
                <Link to="/CustomerOptions" className="card4"></Link>
                </div>
                <div className="card-wrap">
                <p className="card-label">Employee Login</p>
                <Link to="/Emplogin" className="card4"></Link>
                </div>
                <div className="card-wrap">
                <p className="card-label">Manager Login</p>
                <Link to="/Malogin" className="card4"></Link>
                </div>
                </div>
            </main>
            <footer>
                <p>© 2025 Bruhba. All rights reserved.</p>
            </footer>
        </center>
    );
}

export default Home;