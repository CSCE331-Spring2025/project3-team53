import { Link } from "react-router-dom";

const Manager = () => {

return(
<>
<h2 className = "login-header">Select Option</h2>
<div className='manager-card'>
 <p className = 'manager-text'>Standard Ordering</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Inventory</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Scheduling</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Menu Editor</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Order History</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Logging</p> <br />
</div>

<div className='manager-card'>
 <p className = 'manager-text'>Settings</p> <br />
</div>
</>
    );
};
export default Manager;