import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get_weather, translateText } from '../apiCall.js';  // Make sure to import your translateText function


function Home() {
    const [language, setLanguage] = useState("en");  // Default to English
    const [translatedMessage, setTranslatedMessage] = useState("");
    const [weather, setWeather] = useState([]);

    // The original message in English
    const originalMessage = "Bruhba Bobruh is dedicated to surpassing customer expectations through carefully crafted and reliable solutions. Established by Alex Pierce, Aaron Mai, Jianwei Gao, and Chris Maldonado, our company is driven by one goal: putting customers at the center of everything we do. With a mission to deliver products that meet your needs at exceptional value and quality, Bruhba Bobruh ensures every order is tailored to your satisfaction. Why wait? Experience Bruhba Bobruh today!";

    // Handle the language toggle
    const toggleLanguage = async () => {
        const targetLang = language === "en" ? "es" : "en";  // Switch between English (en) and Spanish (es)
        setLanguage(targetLang);

        // Translate the message based on the target language
        const translated = await translateText(originalMessage, targetLang);
        setTranslatedMessage(translated);
    };

    useEffect(() => {
        // Default message in English when the page loads
        setTranslatedMessage(originalMessage);

        const fetchWeather = async () => {
            const weatherData = await get_weather();
            console.log(weatherData);
            setWeather(weatherData);  // Also sets your weather state if you want to display it
        };
    
        fetchWeather();
    }, []);

    return (
        <center>
            <header>
                <h1>Bruhba Bobruh Tea</h1>
            </header>
            <main>
                <h2>Welcome to Bruhba Bobruh Tea</h2>
                <p style={{maxWidth: "800px"}}>{translatedMessage}</p>
                <button onClick={toggleLanguage}>
                    Switch to {language === "en" ? "Spanish" : "English"}
                </button>
                <p></p>
                <nav>
                    <li><Link to="/Customer">Customer Login</Link></li>
                    <li><Link to="/Emplogin">Employee Login</Link></li>
                    <li><Link to="/Malogin">Manager Login</Link></li>
                    {/* <li><Link to="/Debug">Debug Page</Link></li> */}
                </nav>

                <p>Weather: {weather?.current?.temp_f}°F {weather?.current?.condition?.text} - {weather?.location?.name}, {weather?.location?.region}</p>
            </main>
            <footer>
                <p>© 2025 Bruhba. All rights reserved.</p>
            </footer>
        </center>
    );
}

export default Home;