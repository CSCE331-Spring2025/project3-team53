import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <header>
                <h1>Boba Bobruh Tea</h1>
            </header>
            <main>
                <h2>Welcome to Boba Bobruh Tea</h2>
                <p>Maybe a short about us</p>
                <nav>
                    <ul>
                        <li><Link to="/Customer">Customer Login</Link></li>
                        <li><Link to="/Emplogin" >Employee Login</Link></li>
                        <li><Link to="/Malogin">Manager Login</Link></li>
                        <li><Link to="/Debug">Debug Page</Link></li>
                    </ul>
                </nav>
            </main>
            <footer>
                <p>© 2025 Bobruh. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
