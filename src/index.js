import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Shared/Header'
import Main from './Components/Shared/Main'

import Grid from 'material-ui/Grid';

export default class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Router>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <Header />
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Main />
                        </Grid>
                    </Grid>
                </Router>
            </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));