import React from 'react';
import HeaderAnchor from './HeaderAnchor';
import './Footer.css'
const Footer = ()=>{

    return(
        <div className="footer">
            <div className="footer-column">
                <HeaderAnchor flagLink={true} value='/'>Home</HeaderAnchor>
            </div>
            <div className="footer-column">
                <HeaderAnchor flagLink={true} value='/Interest'>Interest</HeaderAnchor>
            </div>
            <div className="footer-column">
                <HeaderAnchor flagLink={true} value='/Writing'>Writing</HeaderAnchor>
            </div>
            <div className="footer-column">
                <HeaderAnchor flagLink={true} value='/Examples'>Examples</HeaderAnchor>
            </div>
        </div>
    )

}

export default Footer;