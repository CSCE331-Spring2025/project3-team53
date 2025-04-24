import { Link } from "react-router-dom";

const CustomerOptions = () => {
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
      title: "Milk Tea",
      description: "A smooth blend of rich tea and creamy milk for the perfect balance of flavor.",
      alt: "Our Mascot",
      link: "/CustomerOptions/milk-tea",
    },
    {
      id: 2,
      title: "Fruit Tea",
      description: "A vibrant mix of fruit flavors and tea, refreshingly light with a hint of love.",
      alt: "Hohn Jina",
      link: "/CustomerOptions/fruit-tea",
    },
    {
      id: 3,
      title: "Brewed Tea",
      description: "Classic fresh tea brewed daily for a clean, crisp, and energizing experience.",
      alt: "Our Boy",
      link: "/CustomerOptions/brewed-tea",
    },
  ];

  const drinksRow2 = [
    {
      id: 4,
      title: "Fresh Milk",
      description: "Start your day with a nice blend of milk and some Bobruh goodness.",
      alt: "Milk Drink",
      link: "/CustomerOptions/fresh-milk",
    },
    {
      id: 5,
      title: "Ice Blended",
      description: "Cold, creamy, and perfect all year round.",
      alt: "Ice Blended Drink",
      link: "/CustomerOptions/ice-blended",
    },
    {
      id: 6,
      title: "Tea Mojito",
      description: "The flavors of a mojito combined with signature Bobruh flavors. What could go wrong?",
      alt: "Mojito Tea",
      link: "/CustomerOptions/tea-mojito",
    },
  ];

  const drinksRow3 = [
    {
      id: 7,
      title: "Cremé",
      description: "smooth and rich. Cremé drinks elevate the experience of the user tenfold.",
      alt: "Cream",
      link: "/CustomerOptions/creme",
    },
    {
      id: 8,
      title: "Specialty",
      description: "The real creme of the crop. Order them fast because some of them will be gone forever.",
      alt: "Spec/Promo",
      link: "/CustomerOptions/specialty",
    },
    {
      id: 9,
      title: "Build Your Own Tea",
      description: "When it comes to choices you know best. Cut out the middle-man and choose your own combinations.",
      alt: "BYOT",
      link: "/CustomerOptions/build-your-own-tea",
    },
  ];

  const renderCard = ({ id, title, description, alt, link }) => {
    const card = (
      <div className="card2" onClick={() => handleCardClick(id)} style={cardStyle}>
        <div style={{ borderRadius: "50%", padding: "1rem" }}>
          <img src="/Hohn_Jina.jpg" alt={alt} style={imgStyle} />
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
    <>
      <style>
        {`body { background-color: lightblue; margin: 0; }`}
      </style>
      <div style={{ minHeight: "100vh" }}>
        <h1 className="title-m2">DRINKS MENU</h1>
        <hr />
        <div className="card-container" style={{ display: "flex", justifyContent: "space-around", padding: "1rem", gap: "2rem" }}>
          {drinksRow1.map(renderCard)}
        </div>
        <hr />
        <div className="card-container" style={{ display: "flex", justifyContent: "space-around", padding: "1rem", gap: "2rem" }}>
          {drinksRow2.map(renderCard)}
        </div>
        <hr />
        <div className="card-container" style={{ display: "flex", justifyContent: "space-around", padding: "1rem", gap: "2rem" }}>
          {drinksRow3.map(renderCard)}
        </div>
        <hr />
      </div>
    </>
  );
};

export default CustomerOptions;
