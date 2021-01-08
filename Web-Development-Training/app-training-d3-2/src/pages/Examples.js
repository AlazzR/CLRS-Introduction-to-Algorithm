import React, { version } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import * as d3 from 'd3';
import './Examples.css'



const Examples = ({name})=>{
    const [, setName] = React.useReducer(name => name, undefined);
    React.useEffect(()=> {
        {console.log('TTTTTTT', name)}
        setName();}, [name]);
    return(
        <div> 
        <NavBar />
        <br/>
        <br/>
            <div className="Example" key='Ex1'>
                <BarExample key={0} isShowFromParent={name !== undefined?name: -1} url='/example1data' xname='groups' yname='values' title='Values vs. Groups'> This will be example 1, in which it contains a bar chart for values versus groups. It will only be in the range of postive integers.</BarExample>
            </div>
            <div className="Example" key="Ex2">
                <ScatterPlot  isShowFromParent={name !== undefined?name: -1}/>
            </div>
        <Footer />
    </div>)
};

const BarExample = ({key, children, url, xname, yname, title, isShowFromParent})=>{
    const ref = React.useRef();
    const showDelete = (state, action) =>{
        if(action.type === "RESET")
        {
            const response =new XMLHttpRequest();
            response.onload = (event) =>{
                if(response.status === 200)
                {
                    setData(JSON.parse(response.responseText).Data);
                    setMaxState(JSON.parse(response.responseText).max);
                }
            }
            const reqData = new FormData();
            reqData.append('group', '');
            reqData.append('value', '');
            reqData.append('reset', true);
            response.open('POST', url);
            response.send(reqData);
            return{...state};
        }
        if(action.type === "SHOW")
        {
            const st = state.show;
            return{...state, show: !st};
        }
    };
    const [showResetButtons, setShowReset] = React.useReducer(showDelete, {show: isShowFromParent==0?true: false});
    const [descriptionState, setDescriptionState] = React.useState(false);
    const [formState, setFormState] = React.useState(true);
    const [maxState, setMaxState] = React.useState(0);
    const [data, setData] = React.useState([]);
    const handleFormFilled = ()=>{
        if(document.querySelector('#group-input').value.length !== 0 && document.querySelector('#value-input').value.length !== 0)
            setFormState(false)
        else
            setFormState(true)
    }
    const handleSetFormState = (event)=>{
        const group = document.querySelector('#group-input').value;
        const value =  document.querySelector('#value-input').value;
        if(event !== undefined)
            event.preventDefault();
        const response = new XMLHttpRequest();
        response.onload = (event)=>{
            if(response.status === 200)
            {
                setData(JSON.parse(response.responseText).Data);            
                setMaxState(JSON.parse(response.responseText).max);
            }
        }
        const reqData = new FormData();
        reqData.append('group', group);
        reqData.append('value', value);
        reqData.append('reset', false);
        response.open('POST', url);
        response.send(reqData);
    };
    React.useEffect(()=>{
        console.log(data)
        if(data.length === 0)
        {
            const svg = d3.select(ref.current);
            const margin ={top: 30, right: 30, bottom: 30, left: 30};
            const width = 400 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom
            svg.attr('width', width + margin.left + margin.right)
               .attr('height', height + margin.top + margin.bottom)
               .attr('class', 'g-container');
           
           svg.append('g').attr('class', 'g-container');
           handleSetFormState();
        }
        
        if(data.length !== 0 && maxState !== 0)
        {
            const svg = d3.select(ref.current);

            svg.selectAll('rect').remove(); 
            svg.selectAll('.axis').remove();
            const margin ={top: 30, right: 30, bottom: 30, left: 30};
            const width = 400 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;
   
           const xScale = d3.scaleBand()
                           .domain(data.map(item => (item.group)))
                           .range([margin.left, width])
                           .padding(0.2)
           const xAxis = svg.append('g')
                            .attr('class', 'axis')
                           .call(d3.axisBottom(xScale))
                           .attr('transform', `translate(${margin.left}, ${width})`)
           const yScale = d3.scaleLinear()
                           .domain([0, maxState])
                           .range([height, margin.bottom])
           const yAxis = svg.append('g')
                            .attr('class', 'axis')  
                           .call(d3.axisLeft(yScale))
                           .attr('transform', `translate(${2*margin.left}, ${0})`)
           function handleMouseOver(item, ind)
           {
               let value = 0;
               let counter = 0;
               for(let item of data)
               {
                   value += item.value;
                   counter++;
               }
               const avg = value/counter;
               console.log(avg)
               d3.select(this)
                   .attr('fill', '#3366ff')
               rects.append('text')
                   .attr('x', item => (xScale(item.group) + xScale.bandwidth()/2 + xScale.bandwidth()/3))
                   .attr('y', item =>(yScale(item.value) + 30))
                   .attr('text-anchor', 'middle')
                   .text(item => item.value + ' num')
                   .attr('fill', 'white')
                   .attr('class', 'values')
                 const svg = d3.select(ref.current);
                 svg.append('path')
                    .datum([{x: 0, y: avg}, {x: width + margin.left + margin.right, y: avg}])
                    .attr('stroke', 'red')
                    .attr('stroke-width', 1.5)
                    .attr('d', d3.line()
                                .x((d) => (d.x))
                                .y((d) => (yScale(d.y))))
                    .style("stroke-dasharray", ("3, 3"))
                    .attr('class', 'path-line') 
                    .append('text')
                    .attr('x', 0)

                svg.append('text')
                    .attr('x', width + margin.left)
                    .attr('y', yScale(avg) - 10)
                    .text(avg.toFixed(2))
                    .attr('fill', 'red')
                    .attr('class', 'values')

                svg.append('text')
                    .attr('x', width + 20)
                    .attr('y', yScale(avg))
                    .text('mean')
                    .attr('fill', 'red')
                    .attr('class', 'values')
           }
           function handleMouseOut(item, ind)
           {
               d3.select(this)
                   .attr('fill', '#003399')
               d3.selectAll('.values')
                   .remove()
                d3.select('.path-line').remove()
           }
           const rects = svg.selectAll('rect')
                           .data(data)
                           .enter()
                           .append('g')
           rects.append('rect')
               .attr('transform', `translate(${margin.left}, ${0})`)
               .attr('x', (item) => (xScale(item.group)))
               .attr('y', (item) => (yScale(item.value)))
               .attr('width', xScale.bandwidth())
               .attr('height', (item) => (height - yScale(item.value)))
               .attr('fill', '#003399')
               .on('mouseover', handleMouseOver)
               .on('mouseout', handleMouseOut)
           svg.append('text')
               .attr('x', width/2 + margin.left)
               .attr('y', height + margin.top )
               .attr('text-anchor', 'middle')
               .text(xname)
           svg.append('text')
               .attr('transform', 'rotate(-90)')
               .attr('x', -width/2 )
               .attr('y', margin.left)
               .attr('text-anchor', 'middle')
               .text(yname)
           svg.append('text')
               .attr('x', width/2)
               .attr('y', 15)
               .attr('text-anchor', 'middle')
               .text(title)   
        }
         
     }, [data, maxState]);

     React.useEffect(() =>{
        console.log('BRASDD', isShowFromParent);

         if(isShowFromParent === -1)
         {
             console.log('BAR chart');
             if(showResetButtons['show'] === true)
                 setShowReset({type: "SHOW"});
         }
         else if(isShowFromParent === 0){
            {
                if(showResetButtons['show'] === false)
                    setShowReset({type: "SHOW"});
            }
         }

     }, [isShowFromParent])
     return(
         <div key={key}>
            <span>
                <button onClick={()=> setShowReset({type: "SHOW"})} onMouseOver={() => setDescriptionState(true)} onMouseOut={() => setDescriptionState(false)}>Show Example 1{key}</button>
                <div className={descriptionState?"description active":"description"}>
                    {children}
                </div>
            </span>
            <br/>
            <div id="ex1" style={showResetButtons["show"]?{display: "block"}: {display: "none"}}>
                <button onClick={() => setShowReset({type: "RESET"})} style={{backgroundColor: 'red'}}>Reset</button>
                <form onSubmit={handleSetFormState} >
                    <div>
                        <label htmlFor="#group-input">Please enter the {xname}:-</label>
                        <input id="group-input" type='text' placeholder="Please enter the group value" onChange={handleFormFilled}></input>
                    </div>
                    <div> 
                        <label htmlFor="#value-input">Pleae enter the {yname} of this group:-</label>
                        <input id="value-input" type='number' placeholder="Please enter the group value" onChange={handleFormFilled}></input> 
                    </div>
                    <div>
                        <button type="submit" disabled={formState}>Submit</button>
                    </div>
                </form>
                <br/> 
                <svg  ref={ref} ></svg>
            </div>
         </div>

     );
};

const ScatterPlot = ({isShowFromParent})=>{   
    const ref = React.useRef();
    const colors = {'setosa': 'red', 'versicolor': 'blue', 'virginica': 'green'}
    const showResetReducer = (state, action)=>{
        if(action.type === 'SHOW')
        {
            const tmp = state.isShow;
            return{...state, isShow: !tmp};
        }
    }
    const [showResetValues, dispatchShowReset] = React.useReducer(showResetReducer, {isShow: isShowFromParent===1?false:true});
    React.useEffect(() =>{
        if(isShowFromParent === -1)
        {
            if(showResetValues['isShow'] === false)
                dispatchShowReset({type: 'SHOW'});
        }
        else if(isShowFromParent === 1)
        {
            if(showResetValues['isShow'] === true)
                dispatchShowReset({type: 'SHOW'});
        }
    }, [isShowFromParent]);

    const irisMeasurements = (state, action)=>{
        //Should use switch
        if(action.type === 'SEPAL_LENGTH')
        {
            return{...state, sepalLength: document.querySelector('#sepal-length').value};
        }
        else if(action.type === 'Reset_SEPAL_LENGTH')
        {
            document.querySelector('#sepal-length').value = 4.3;
            return{...state, sepalLength: 4.3};
        }
        else if(action.type === 'SEPAL_WIDTH')
        {
            return{...state, sepalWidth: document.querySelector('#sepal-width').value};
        }
        else if(action.type === 'Reset_SEPAL_WIDTH')
        {
            document.querySelector('#sepal-width').value = 2.0;
            return{...state, sepalWidth: 2.0};
        }
        else if(action.type === 'PETAL_LENGTH')
        {
            return{...state, petalLength: document.querySelector('#petal-length').value};
        }
        else if(action.type === 'Reset_PETAL_LENGTH')
        {
            document.querySelector('#petal-length').value = 1.0;
            return{...state, petalLength: 1.0};
        }
        else if(action.type === 'PETAL_WIDTH')
        {
            return{...state, petalWidth: document.querySelector('#petal-width').value};
        }
        else if(action.type === 'Reset_PETAL_WIDTH')
        {
            document.querySelector('#petal-width').value = 0.1;
            return{...state, petalWidth: 0.1};
        }
        else if(action.type === 'Prediction')
        {
            return{...state, cl: action.payload};
        }
        else if(action.type === 'RESET')
        {
            document.querySelector('#sepal-length').value = 4.3;
            document.querySelector('#sepal-width').value = 2.0;
            document.querySelector('#petal-width').value = 0.1;
            document.querySelector('#petal-length').value = 1.0;
            return{...state, sepalLength: 4.3, sepalWidth: 2.0, petalLength: 1.0, petalWidth: 0.1};

        }
        else{
            throw new Error("Wrong Type");
        }
    };
    const [irisState, dispatchIrisState] = React.useReducer(
        irisMeasurements, {cl: '',sepalLength: 4.3, sepalWidth: 2.0, petalLength:1.0, petalWidth:0.1});
    const [resetState, setShowReset] = React.useState(false);
    const handleReset = ()=>{
        setShowReset(!resetState);
        dispatchIrisState({type: 'RESET'});
        dispatchIrisState({type: 'Prediction', payload: ''});

        d3.select('.putative-match').remove();


    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        const response = new XMLHttpRequest();
        response.onload = ()=>{
            if(response.status === 200)
            {
                const res = JSON.parse(response.responseText);
                dispatchIrisState({type: 'Prediction', payload: res.class});
                console.log('class', res.class);
                console.log('PW', res.PW);
                console.log('PL', res.PL);
                console.log('SW', res.SW);
                console.log('SL', res.SL);
                updateSVG();
            }
        }
        const data = new FormData();
        data.append('PW', irisState['petalWidth']);
        data.append('PL', irisState['petalLength']);
        data.append('SW', irisState['sepalWidth']);
        data.append('SL', irisState['sepalLength']);
        response.open('POST', '/example2data');
        response.send(data);
    };
    const updateSVG = ()=>{
        const svg = d3.select(ref.current);
        d3.select('.putative-match').remove();
        let data = [];
        let target;
        const response = new XMLHttpRequest();

        response.onload =()=>{
            if(response.status === 200)
            {
                data = JSON.parse(response.responseText).data;
                const sl = irisState['sepalLength'];
                const sw = irisState['sepalWidth'];

                


                const margin ={top: 30, right: 30, bottom: 30, left: 30};
                const width = 360 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                const xScale = d3.scaleLinear()
                                .domain([4.2, 8])
                                .range([0, width]);
                const yScale = d3.scaleLinear()
                                .domain([1.9, 4.5])
                                .range([height, 0]);
                
                function handleMouseOver(item, ind){
                    console.log('indddd', ind);
                    console.log('iteemmm', item);


                    svg.append('rect')
                        .attr('transform', `translate(${margin.left}, 0)`)
                        .attr('x', xScale(ind.sl) + 35)
                        .attr('y', yScale(ind.sw))
                        .attr('height', 80)
                        .attr('width', 80)
                        .attr('fill', 'white')
                        .attr('stroke', 'black')
                        .attr('class', 'temp')
                    
                    svg.append('text')
                            .attr('transform', `translate(${margin.left +5}, 0)`)
                            .attr('x', xScale(ind.sl) + 65)
                            .attr('y', yScale(ind.sw) + 20)  
                            .attr('text-anchor', 'middle')
                            .text('Sl:' + ind.sl + ' cm')
                            .attr('class', 'temp');
                    svg.append('text')
                            .attr('transform', `translate(${margin.left +5}, 0)`)
                            .attr('x', xScale(ind.sl) + 65)
                            .attr('y', yScale(ind.sw) + 35)  
                            .attr('text-anchor', 'middle')
                            .text('SW:' + ind.sw + ' cm')
                            .attr('class', 'temp');

                    svg.append('text')
                            .attr('transform', `translate(${margin.left +5}, 0)`)
                            .attr('x', xScale(ind.sl) + 70)
                            .attr('y', yScale(ind.sw) + 50)  
                            .attr('text-anchor', 'middle')
                            .text('PW:' + ind.pw + ' cm')
                            .attr('class', 'temp');

                    svg.append('text')
                            .attr('transform', `translate(${margin.left +5}, 0)`)
                            .attr('x', xScale(ind.sl) + 65)
                            .attr('y', yScale(ind.sw) + 65)  
                            .attr('text-anchor', 'middle')
                            .text('PL:' + ind.pl + ' cm')
                            .attr('class', 'temp')
                }
                function handleMouseOut(item, ind){
                    d3.selectAll('.temp').remove();
                }
                svg.attr('width', width + 4*margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .attr('class', 'g-container')
                svg.append('g')
                    .attr('class', 'axis')
                    .call(d3.axisBottom(xScale))
                    .attr('transform', `translate(${2 * margin.left}, ${height})`)
                
                svg.append('g')
                    .attr('class', 'axis')
                    .call(d3.axisLeft(yScale))
                    .attr('transform', `translate(${2 * margin.left}, 0)`)
                
                const circles = svg.append('g').selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('transform', `translate(${2 * margin.left}, 0)`)
                    .attr('cx', (item)=> xScale(item.sl))
                    .attr('cy', (item)=> yScale(item.sw))
                    .attr('r', 4)
                    .attr('fill', (item) => (colors[item.c]))
                    .on('mouseover', handleMouseOver)
                    .on('mouseout', handleMouseOut)


                
                svg.append('g')
                .attr('transform', `translate(${width - margin.right}, 0)`)
                .append('rect')
                .attr('height', 50)
                .attr('width', 80)
                .attr('stroke', 'red')
                .attr('fill', 'transparent')
                
                svg.append('circle')
                .attr('cx', width - 22)   
                .attr('cy', 10)
                .attr('r', 5)
                .attr('fill', 'blue')
                svg.append('text')
                .attr('x', width + 10)
                .attr('y', 15)
                .attr('text-anchor', 'middle')
                .style('font', "13px times")
                .text('versicolor')
                
                svg.append('circle')
                .attr('cx', width - 22)   
                .attr('cy', 27)
                .attr('r', 5)
                .attr('fill', 'red')
                svg.append('text')
                .attr('x', width )
                .attr('y', 30)
                .attr('text-anchor', 'middle')
                .style('font', "13px times")
                .text('setosa')
                                    
                svg.append('circle')
                .attr('cx', width - 22)   
                .attr('cy', 40)
                .attr('r', 5)
                .attr('fill', 'green')
                svg.append('text')
                .attr('x', width + 6)
                .attr('y', 44)
                .attr('text-anchor', 'middle')
                .style('font', "13px times")
                .text('virginica')

                svg.append('circle')
                    .attr('transform', `translate(${2* margin.left}, 0)`)
                    .attr('cx', xScale(sl))
                    .attr('cy', yScale(sw))
                    .attr('r', 7)
                    .attr('fill', 'purple')
                    .attr('class', 'putative-match')
                svg.append('g')
                    .attr('transform', `translate(${2 * margin.left }, ${height + margin.top})`)
                    .append('text')
                    .attr('x', width/4)
                    .attr('y', 4)
                    .text('Sepal Length')
                    .style('font', '20px times')

                svg.append('g')
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', -(width- 10)/2 )
                    .attr('y', margin.left)
                    .attr('text-anchor', 'middle')
                    .text('Sepal Width')
            }
        };
        response.open('GET', '/getExample2Data');
        response.send();


    };
    const [descriptionState, setdescriptionState] = React.useState(false);

    return(
        <div>
            <button onClick={()=>(dispatchShowReset({type: 'SHOW'}))} onMouseOver={() => setdescriptionState(true)} onMouseOut={() => setdescriptionState(false)}>Show Example 2</button>
            <div className={descriptionState?"description active":"description"}>
                This will be example 2, in which it contains a scatter plot for sepal length vs. sepal width. It will utilize softmax regression to predict the class of the submitted flower.
            </div>
            <div id="ex2" style={showResetValues['isShow']?{display: 'none'}:{display: 'block'}}>
                <button onClick={handleReset} style={{backgroundColor: 'red'}}>Reset</button>

                <form onSubmit={handleSubmit}>
                    <table style={{width: '100%'}}>
                        <tr>
                            <td style={{width: '65%'}}>
                                <label htmlFor='#sepal-length' sty>Enter Sepal Length (4.3cm-7.9cm):-</label>
                            </td>
                            <td>
                                <input id='sepal-length' type='range' min='4.3' max='7.9' step='0.01' onChange={()=>(dispatchIrisState({type: 'SEPAL_LENGTH'}))}></input>

                                <button className='resetButton' onClick={()=>(dispatchIrisState({type: 'Reset_SEPAL_LENGTH'}))}>X</button>
                                <span style={{fontSize: 15}}>{irisState['sepalLength']}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='#sepal-width'>Enter Sepal Width (2.0cm-4.4cm):-</label>
                            </td>
                            <td>
                                <input id='sepal-width' type='range' min='2.0' max='4.4' step='0.01' onChange={()=>(dispatchIrisState({type: 'SEPAL_WIDTH'}))}></input>

                                <button className='resetButton' onClick={()=>(dispatchIrisState({type: 'Reset_SEPAL_WIDTH'}))}>X</button>
                                <span style={{fontSize: 15}}>{irisState['sepalWidth']}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='#petal-length'>Enter Petal Length (1.0cm-6.9cm):-</label>
                            </td>
                            <td>
                                <input id='petal-length' type='range' min='1.0' max='6.9' step='0.01' onChange={()=>(dispatchIrisState({type: 'PETAL_LENGTH'}))}></input>

                                <button className='resetButton' onClick={()=>(dispatchIrisState({type: 'Reset_PETAL_LENGTH'}))}>X</button>
                                <span style={{fontSize: 15}}>{irisState['petalLength']}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='#petal-width'>Enter Petal Width (0.1cm-2.5cm):-</label>
                            </td>
                            <td>
                                <input id='petal-width' type='range' min='0.1' max='2.5' step='0.01' onChange={()=>(dispatchIrisState({type: 'PETAL_WIDTH'}))}></input>

                                <button className='resetButton' onClick={()=>(dispatchIrisState({type: 'Reset_PETAL_WIDTH'}))}>X</button>
                                <span style={{fontSize: 15}}>{irisState['petalWidth']}</span>
                            </td>
                        </tr>
                    </table>

                    <button type='submit'>Submit</button>
                </form>
                <div>
                    <svg ref={ref}></svg>
                </div>
                <div style={{textAlign: 'center'}}>
                    {console.log('class', irisState['cl'])}
                    {irisState['cl'] === ''?'You didn\'t press the submit button':
                    <>
                        <img style={{marginBottom: 0}} src={'/images/' + irisState['cl'] +'.png'} >{console.log('/images/' + irisState['cl'])}</img>
                    </>}

                    <figure style={{marginTop: 0, fontSize: 15}}>The type of this flower with the submitted dimensions is {irisState['cl'] ===''?" ,You didn't submit the dimensnions of the flower.": irisState['cl'] +'.'}</figure>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default Examples;