import { Link } from "react-router-dom";

const Categories = () => {
    return(
        <>
            <h2 className="login-header">Menu</h2>
            
            <Link to="/drinks/milkTea" className='manager-card'>
                <p className='manager-text'>Milk Tea</p> <br />
            </Link>

            <Link to="/drinks/fruitTea" className='manager-card'>
                <p className='manager-text'>Fruit Tea</p> <br />
            </Link>

            <Link to="/drinks/brewedTea" className='manager-card'>
                <p className='manager-text'>Brewed Tea</p> <br />
            </Link>

            <Link to="/drinks/freshMilk" className='manager-card'>
                <p className='manager-text'>Fresh Milk</p> <br />
            </Link>

            <Link to="/drinks/iceBlended" className='manager-card'>
                <p className='manager-text'>Ice Blend</p> <br />
            </Link>

            <Link to="/drinks/mojito" className='manager-card'>
                <p className='manager-text'>Tea Mojito</p> <br />
            </Link>

            <Link to="/drinks/crema" className='manager-card'>
                <p className='manager-text'>Cremé</p> <br />
            </Link>

            <Link to="/drinks/specialty" className='manager-card'>
                <p className='manager-text'>Specialty/Promotion</p> <br />
            </Link>

            <Link to="/drinks/byot" className='manager-card'>
                <p className='manager-text'>BYOT</p> <br />
            </Link>
        </>
    );
};

export default Categories;
