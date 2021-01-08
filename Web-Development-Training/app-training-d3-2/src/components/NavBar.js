import React from 'react';
import './NavBar.css'
import HeaderAnchor from './HeaderAnchor'
const NavBar = ()=>{
    const styleHome = {
        fontSize: 'large',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    };
    const rest ={
        paddingTop: 10,
        paddingBottom: 10
    };

    const examples =[
        'Example1', 'Example2',
    ];

    return(
        <div className="headerContainer">
            <div className="header-column">
                <HeaderAnchor style={styleHome} flag={true} flagLink={true} value='/'>Home</HeaderAnchor>
            </div>
            <div className="header-column">
                <HeaderAnchor style={rest}>Interests</HeaderAnchor>
            </div>            
            <div className="header-column">
                <HeaderAnchor style={rest} list={examples} flagLink={true} value='/Examples'>Examples</HeaderAnchor>
            </div>
            <div className="header-column">
                <HeaderAnchor style={rest} value='/Writing'>Writing</HeaderAnchor>
            </div>
            <div className="header-column">
                <HeaderAnchor style={{border:'none', fontSize: 'large', paddingTop: 10, paddingBottom: 10}} value='/'><i class="fas fa-list-ul"></i></HeaderAnchor>
            </div>
            
        </div>
    );
}

export default NavBar;

