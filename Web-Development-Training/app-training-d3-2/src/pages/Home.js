import React from 'react';
import './Home.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
const Home = ()=>
{

    return(
        <>
            <NavBar/>
            <div className='home-container'>
               <video src="/videos/video-1.mp4" autoPlay loop muted/>
                <div className='buttons-center'>
                    <Link to={{pathname:'/examples', example: 0}}>
                        <button className='homeButton'>Example 1</button>
                    </Link>
                    <Link to={{pathname:'/examples', example: 1}}>
                        <button className='homeButton'>Example 2</button>
                    </Link>

                </div>
            </div>
            <br></br>
            <Footer />
        </>
    )


}

export default Home;