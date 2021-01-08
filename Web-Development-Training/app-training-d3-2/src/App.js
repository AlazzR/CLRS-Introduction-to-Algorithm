import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home'
import Examples from './pages/Examples'
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/examples" component={(props) => (<Examples name={props.location.example} />)}/>
          </Switch>

      </Router>
    </div>
  );
}

export default App;
