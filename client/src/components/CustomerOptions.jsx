import { Link } from "react-router-dom";
const CustomerOptions = () => {
    //We can use this to send to the right component
    const handleCardClick = (id) => {
        console.log(`Card ${id} clicked!`);
      };
 return (
    <>
    <h1 className="title-m2">DRINKS MENU</h1>
    <hr />
    <div className="card-container" style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', border: 'none', gap: '2rem'}}>
  <div className="card2" onClick={() => handleCardClick(1)} style={{ textAlign: 'center', cursor: 'pointer'  }}>
    <div style={{borderRadius: '50%', padding: '1rem' }}>
      <img src="/Hohn_Jina.jpg" alt="Our Mascot" style={{ width: '15vw', height: '15vw', borderRadius: '50%' }} />
    </div>
    <h2 style={{ fontWeight: 'bold', marginTop: '1rem', fontSize: '2.5em' }}>Milk Tea</h2>
    <p>A smooth blend of rich tea and creamy milk for the perfect balance of flavor.</p>
  </div>

  <div className="card2" onClick={() => handleCardClick(2)} style={{ textAlign: 'center', cursor: 'pointer' }}>
    <div style={{ borderRadius: '50%', padding: '1rem' }}>
      <img src="/Hohn_Jina.jpg" alt="Hohn Jina" style={{ width: '15vw', height: '15vw', borderRadius: '50%' }} />
    </div>
    <Link>
    <h2 style={{ fontWeight: 'bold', marginTop: '1rem', fontSize: '2.5em' }}>Fruit Tea</h2>
    </Link>
    <p>A vibrant mix of fruit flavors and tea, refreshingly light with a hint of love.</p>
  </div>

  <div className="card2" onClick={() => handleCardClick(3)} style={{ textAlign: 'center', cursor: 'pointer' }}>
    <div style={{ borderRadius: '50%', padding: '1rem' }}>
      <img src="/Hohn_Jina.jpg" alt="Our Boy" style={{ width: '15vw', height: '15vw', borderRadius: '50%' }} />
    </div>
    <h2 style={{ fontWeight: 'bold', marginTop: '1rem', fontSize: '2.5em' }}>Brewed Tea</h2>
    <p>Classic fresh tea brewed daily for a clean, crisp, and energizing experience.</p>
  </div>
</div>
<hr />
    </>
 )
};
export default CustomerOptions