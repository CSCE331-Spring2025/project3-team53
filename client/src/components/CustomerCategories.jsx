import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { translateText, get_weather } from "../apiCall.js"; // Ensure you have the translate function correctly imported

const CustomerOptions = () => {
  const location = useLocation();
  //const { email } = location.state || ''; // email (can be nullable)
  //console.log(email); // debug
  const [language, setLanguage] = useState("en"); // Track the language state
  const [translations, setTranslations] = useState({}); // Store translations as an object
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState([]);

  //for more language support simply add them to the array
  const languageOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Español (Spanish)" },
    { code: "fr", name: "Français (French)" },
    { code: "de", name: "Deutsch (German)" },
    { code: "el", name: "Ελληνικά (Greek)" },
    { code: "ko", name: "한국어 (Korean)" },
    { code: "ja", name: "日本語 (Japanese)" }
  ];

  const fetchTranslations = async (newLanguage) => {
    const englishTexts = [ //uses of array of the english text to translate
      "DRINKS MENU",
      "Classic Favorites",
      "Milk Tea",
      "A smooth blend of rich tea and creamy milk for the perfect balance of flavor.",
      "Fruit Tea",
      "A vibrant mix of fruit flavors and tea, refreshingly light with a hint of love.",
      "Brewed Tea",
      "Classic fresh tea brewed daily for a clean, crisp, and energizing experience.",
      "Refreshing Choices",
      "Fresh Milk",
      "Start your day with a nice blend of milk and some Bobruh goodness.",
      "Ice Blended",
      "Cold, creamy, and perfect all year round.",
      "Tea Mojito",
      "The flavors of a mojito combined with signature Bobruh flavors. What could go wrong?",
      "Specialty Drinks",
      "Cremé",
      "Smooth and rich. Cremé drinks elevate the experience of the user tenfold.",
      "Specialty",
      "The real creme of the crop. Order them fast because some of them will be gone forever.",
      "Build Your Own Tea",
      "When it comes to choices you know best. Cut out the middle-man and choose your own combinations.",
    ];
  
    const translatedTexts = await translateText(englishTexts, newLanguage);
    
    // mapping from English to translated text
    const newTranslations = {};
    for (let i = 0; i < englishTexts.length; i++) {
      newTranslations[englishTexts[i]] = translatedTexts[i];
    }
    
    return newTranslations;
  };

  useEffect(() => {
    const getTranslations = async () => {
      setIsLoading(true);
      try {
        const newTranslations = await fetchTranslations(language);
        setTranslations(newTranslations);
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    getTranslations();

    const fetchWeather = async () => {
        const weatherData = await get_weather();
        console.log(weatherData);
        setWeather(weatherData);  
    };
    fetchWeather();
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCardClick = (id) => {
    console.log(`Card ${id} clicked!`);
  };

  const cardStyle = {
    textAlign: "center",
    cursor: "pointer",
  };

  const imgStyle = {
    width: "15vw",
    height: "15vw",
    borderRadius: "50%",
  };

  const drinksRow1 = [
    {
      id: 1,
      title: translations["Milk Tea"] || "Milk Tea",
      description: translations["A smooth blend of rich tea and creamy milk for the perfect balance of flavor."] || "A smooth blend of rich tea and creamy milk for the perfect balance of flavor.",
      alt: "Our Mascot",
      link: "/CustomerMenu/Milk-Tea",
      image: "/milk_tea.jpg"
    },
    {
      id: 2,
      title: translations["Fruit Tea"] || "Fruit Tea",
      description: translations["A vibrant mix of fruit flavors and tea, refreshingly light with a hint of love."] || "A vibrant mix of fruit flavors and tea, refreshingly light with a hint of love.",
      alt: "Hohn Jina",
      link: "/CustomerMenu/Fruit-Tea",
      image: "/fruit-tea.jpg"
    },
    {
      id: 3,
      title: translations["Brewed Tea"] || "Brewed Tea",
      description: translations["Classic fresh tea brewed daily for a clean, crisp, and energizing experience."] || "Classic fresh tea brewed daily for a clean, crisp, and energizing experience.",
      alt: "Our Boy",
      link: "/CustomerMenu/Brewed-Tea",
      image: "/brewed-tea.jpg"
    },
  ];

  const drinksRow2 = [
    {
      id: 4,
      title: translations["Fresh Milk"] || "Fresh Milk",
      description: translations["Start your day with a nice blend of milk and some Bobruh goodness."] || "Start your day with a nice blend of milk and some Bobruh goodness.",
      alt: "Milk Drink",
      link: "/CustomerMenu/Fresh-Milk",
      image: "/fresh-milk.jpg"
    },
    {
      id: 5,
      title: translations["Ice Blended"] || "Ice Blended",
      description: translations["Cold, creamy, and perfect all year round."] || "Cold, creamy, and perfect all year round.",
      alt: "Ice Blended Drink",
      link: "/CustomerMenu/Ice-Blended",
      image: "/ice-blended.jpg"
    },
    {
      id: 6,
      title: translations["Tea Mojito"] || "Tea Mojito",
      description: translations["The flavors of a mojito combined with signature Bobruh flavors. What could go wrong?"] || "The flavors of a mojito combined with signature Bobruh flavors. What could go wrong?",
      alt: "Mojito Tea",
      link: "/CustomerMenu/Mojito",
      image: "/mojito-tea.jpg"
    },
  ];

  const drinksRow3 = [
    {
      id: 7,
      title: translations["Cremé"] || "Cremé",
      description: translations["Smooth and rich. Cremé drinks elevate the experience of the user tenfold."] || "smooth and rich. Cremé drinks elevate the experience of the user tenfold.",
      alt: "Cream",
      link: "/CustomerMenu/Crema",
      image: "/crema-tea.jpg"
    },
    {
      id: 8,
      title: translations["Specialty"] || "Specialty",
      description: translations["The real creme of the crop. Order them fast because some of them will be gone forever."] || "The real creme of the crop. Order them fast because some of them will be gone forever.",
      alt: "Spec/Promo",
      link: "/CustomerMenu/Specialty",
      image: "/specialty-tea.jpg"
    },
    {
      id: 9,
      title: translations["Build Your Own Tea"] || "Build Your Own Tea",
      description: translations["When it comes to choices you know best. Cut out the middle-man and choose your own combinations."] || "When it comes to choices you know best. Cut out the middle-man and choose your own combinations.",
      alt: "BYOT",
      link: "/CustomerMenu/build-your-own-tea",
      image: "/BYOT.jpg"
    },
  ];
  const renderCard = ({ id, title, description, alt, link, image }) => {
    const card = (
      <div className="card2" onClick={() => handleCardClick(id)} style={cardStyle}>
        <div style={{ borderRadius: "50%", padding: "1rem" }}>
          <img src={image} alt={alt} style={imgStyle} />
        </div>
        <h2 style={{ fontWeight: "bold", marginTop: "1rem", fontSize: "2.5em" }}>{title}</h2>
        <p>{description}</p>
      </div>
    );

    return link ? (
      <Link
        to={link}
        key={`link-${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {card}
      </Link>
    ) : (
      <div key={`card-${id}`}>{card}</div>
    );
  };

  return (
    <div>
      <style>{`body { background-color: lightblue; margin: 0; }`}</style>
      <div style={{ minHeight: "100vh" }}>
        <div style={{ padding: "1rem" }}>
          <label htmlFor="language-select">Select Language: </label>
          {/*Language drop down*/}
          <select 
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <Link to="/Customer">
        <button className = "cusLogin"> Login</button>
        </Link>
        </div>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading translations...
          </div>
        ) : (
          <>
            <Link to="/">
            <button className="drinksButton" >Go Back</button>
           </Link>
            {<>
            <h1 className="title-m2" style={{ textAlign: 'center', margin: '1rem 0' }}>
              {translations["DRINKS MENU"] || "DRINKS MENU"}
            </h1>
            
            <hr style={{ margin: '0 2rem' }} />

            {/* First Row of Drink Cards */}
            <div style={{ margin: '2rem 0' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {translations["Classic Favorites"] || "Classic Favorites"}
              </h2>
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  Loading drinks menu...
                </div>
              ) : (
                <div className="card-container" style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  justifyContent: "center", 
                  padding: "1rem", 
                  gap: "2rem",
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {drinksRow1.map(renderCard)}
                </div>
              )}
            </div>

            <hr style={{ margin: '0 2rem' }} />

            {/* Second Row of Drink Cards */}
            <div style={{ margin: '2rem 0' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {translations["Refreshing Choices"] || "Refreshing Choices"}
              </h2>
              {isLoading ? null : (
                <div className="card-container" style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  justifyContent: "center", 
                  padding: "1rem", 
                  gap: "2rem",
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {drinksRow2.map(renderCard)}
                </div>
              )}
            </div>

            <hr style={{ margin: '0 2rem' }} />

            {/* Third Row of Drink Cards */}
            <div style={{ margin: '2rem 0' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {translations["Specialty Drinks"] || "Specialty Drinks"}
              </h2>
              {isLoading ? null : (
                <div className="card-container" style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  justifyContent: "center", 
                  padding: "1rem", 
                  gap: "2rem",
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {drinksRow3.map(renderCard)}
                </div>
              )}
            </div>

            <hr style={{ margin: '0 2rem' }} />
          </>}
          </>
        )}
      </div>
      <center>
        <p style={{marginBottom: '5px'}}>{Math.round(weather?.current?.temp_f)}°F {weather?.current?.condition?.text} <img src={weather?.current?.condition?.icon}
                   style={{ verticalAlign: "middle", marginLeft: "-15px", marginRight: "-18px", scale: "50%"}}></img> 
                 - {weather?.location?.name}, {weather?.location?.region}</p>
        <p style={{marginTop: '-20px'}}>© 2025 Bruhba. All rights reserved.</p>
    </center>
    </div>
  );
};

export default CustomerOptions;