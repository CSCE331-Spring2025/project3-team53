import { Link } from "react-router-dom";

const Categories = () => {
    return(
        <>
     <h2 className="login-header">Menu</h2>
            
    <Link to="/menu/Milk-Tea" className='manager-card'>
    <div>
        <p className='manager-text'>Milk Tea</p> <br />
    </div>
    </Link>

<Link to="/menu/Fruit-Tea" className='manager-card'>
    <div>
        <p className='manager-text'>Fruit Tea</p> <br />
    </div>
</Link>

<Link to="/menu/Brewed-Tea" className='manager-card'>
    <div>
        <p className='manager-text'>Brewed Tea</p> <br />
    </div>
</Link>

<Link to="/menu/Fresh-Milk" className='manager-card'>
    <div>
        <p className='manager-text'>Fresh Milk</p> <br />
    </div>
</Link>

<Link to="/menu/Ice-Blended" className='manager-card'>
    <div>
        <p className='manager-text'>Ice Blend</p> <br />
    </div>
</Link>

<Link to="/menu/Mojito" className='manager-card'>
    <div>
        <p className='manager-text'>Tea Mojito</p> <br />
    </div>
</Link>

<Link to="/menu/Crema" className='manager-card'>
    <div>
        <p className='manager-text'>Cremé</p> <br />
    </div>
</Link>

<Link to="/menu/Specialty" className='manager-card'>
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
