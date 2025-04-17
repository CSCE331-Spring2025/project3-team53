import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <header>
                <h1>Bruhba Bobruh Tea</h1>
            </header>
            <main>
                <h2>Welcome to Bruhba Bobruh Tea</h2>
                <p>Bruhba Bobruh is dedicated to surpassing customer expectations through carefully crafted and reliable solutions. Established by Alex Pierce, Aaron Mai, Jianwei Gao, and Chris Maldonado, our company is driven by one goal: putting customers at the center of everything we do. With a mission to deliver products that meet your needs at exceptional value and quality, Bruhba Bobruh ensures every order is tailored to your satisfaction. Why wait? Experience Bruhba Bobruh today!</p>
                <p></p>
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
                <p>© 2025 Bruhba. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
