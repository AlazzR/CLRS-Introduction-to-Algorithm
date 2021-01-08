import React from 'react';
import './HeaderAnchor.css'
import {Link} from 'react-router-dom';
const HeaderAnchor = ({style, children, value='/', list=[], flag=false, flagLink=false})=>
{
    const [clickState, setClickState] = React.useState(false);
    const [hoverState, setHoverState] = React.useState(false);


    const handleClick = ()=>{
        console.log(clickState);

        setClickState(!clickState);
    }
    const aynchronousHover = ()=>{
        return(
            new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    if(!clickState)
                    {
                        if(hoverState)
                            return(resolve(setHoverState(false)));
                    }
                }, 1000);
            })
        );
    }
    const handleHover = ()=>{
        setHoverState(!hoverState);
    };
    return(
        <>
            {flagLink?
            <Link to={value.toLowerCase()}>
                <button className="headerAnchor" onClick={handleClick} style={style} onMouseOver={handleHover} onMouseOut={aynchronousHover}>{flag?<Emblem hoverState={hoverState}/>:''}{children}</button>
            </Link>:
                <button className="headerAnchor" onClick={handleClick} style={style} onMouseOver={handleHover} onMouseOut={aynchronousHover}>
                    {flag?<Emblem hoverState={hoverState}/>:''}{children}
                </button>
            }
            {list.length !== 0?
                <List style={style} hoverState={hoverState} list={list}/>: ''}
        </>
    )
}
const List = ({style, hoverState, list})=>
{
    let counter = 0;
    if(hoverState)
        return(
            <div className='dropdown'>
                {list.map(item =>{
                    return(
                        <Link to={{pathname:'/examples', example:counter}}>
                            <button  key={counter++} className="headerAnchor" style={{paddingTop: 10, paddingBottom: 10}}>
                            {item}
                            </button>
                        </Link>
                    )
                })}
            </div>
        );
    else
        return('');
}

const Emblem = ({hoverState})=>{
    if(hoverState)
        return(
            <>
            <i className="fas fa-book-open"></i>
            </>);
    return(
        <>
        <i className="fas fa-book"></i>
        </>);
}

export default HeaderAnchor;