import { Link } from "react-router-dom";


//Buttons for each category in a panel layout
const Categories = () => {
    return(
        <>
     <h2 className="login-header">Menu</h2>
            
    <Link to="/drinks/milkTea" className='manager-card'>
    <div>
        <p className='manager-text'>Milk Tea</p> <br />
    </div>
</Link>

<Link to="/drinks/fruitTea" className='manager-card'>
    <div>
        <p className='manager-text'>Fruit Tea</p> <br />
    </div>
</Link>

<Link to="/drinks/brewedTea" className='manager-card'>
    <div>
        <p className='manager-text'>Brewed Tea</p> <br />
    </div>
</Link>

<Link to="/drinks/freshMilk" className='manager-card'>
    <div>
        <p className='manager-text'>Fresh Milk</p> <br />
    </div>
</Link>

<Link to="/drinks/iceBlended" className='manager-card'>
    <div>
        <p className='manager-text'>Ice Blend</p> <br />
    </div>
</Link>

<Link to="/drinks/mojito" className='manager-card'>
    <div>
        <p className='manager-text'>Tea Mojito</p> <br />
    </div>
</Link>

<Link to="/drinks/crema" className='manager-card'>
    <div>
        <p className='manager-text'>Cremé</p> <br />
    </div>
</Link>

<Link to="/drinks/specialty" className='manager-card'>
    <div>
        <p className='manager-text'>Specialty/Promotion</p> <br />
    </div>
</Link>

<Link to="/drinks/byot" className='manager-card'>
    <div>
        <p className='manager-text'>BYOT</p> <br />
    </div>
</Link>

        </>
    );
};

export default Categories;
