import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home'
import Card from './components/Card/Card'
import './App.css'



const App = () => (

    <div>

        <div className="content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/card" component={Card} />
            </Switch>
        </div>
    </div>
)



export default App;
