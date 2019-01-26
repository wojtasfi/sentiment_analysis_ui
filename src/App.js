import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import AnalysisList from "./containers/analysis/AnalysisList";
import Analysis from "./containers/analysis/Analysis";
import AnalysisPendingList from "./containers/analysispending/AnalysisPendingList";
import HomePage from "./containers/HomePage";
import Header from "./containers/Header";
import Footer from "./containers/Footer";


class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Route path={'/'} exact component={HomePage}/>
                            <Route path={'/analysis/'} exact component={AnalysisList}/>
                            <Route path={'/analysis/pending'} exact component={AnalysisPendingList}/>
                            <Route path={'/analysis/detail/:analysisId'} component={Analysis}/>
                            <Footer/>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;

