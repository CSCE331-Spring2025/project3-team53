import { Link } from "react-router-dom";

const Manager = () => {

return(
<>
<h2 className = "login-header">Select Option</h2>
<Link to="/Categories">
<div className='manager-card'>
 <p className = 'manager-text'>Standard Ordering</p> <br />
</div>
</Link>

<Link to="/Inventory">
<div className='manager-card'>
 <p className = 'manager-text'>Inventory</p> <br />
</div>
</Link>

<div className='manager-card'>
 <p className = 'manager-text'>Scheduling</p> <br />
</div>

<Link to="/Editor">
<div className='manager-card'>
 <p className = 'manager-text'>Editor</p> <br />
</div>
</Link>
<Link to="/OrderH">
<div className='manager-card'>
 <p className = 'manager-text'>Order History</p> <br />
</div>
</Link>

<Link to="/Logging">
<div className='manager-card'>
 <p className = 'manager-text'>Logging</p> <br />
</div>
</Link>

<Link to="/Settings">
<div className='manager-card'>
 <p className = 'manager-text'>Settings</p> <br />
</div>
</Link>
</>
    );
};
export default Manager;