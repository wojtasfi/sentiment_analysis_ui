import React, { Component } from 'react';
import * as analysisSelectors from "../../redux/analysis/selectors";
import {connect} from "react-redux";
import * as analysisActions from "../../redux/analysis/actions";
import CircularProgress from '@material-ui/core/CircularProgress';

class Analysis extends Component {

    componentDidMount() {
        const { match: { params }, history , loadSingleAnalysis} = this.props;

        loadSingleAnalysis(params.analysisId)
    }

    isLoading(){
        const {analysis} = this.props;
        if (analysis == null) return true;
        return false
    }

    render() {
        const {analysis} = this.props;

        if(this.isLoading()) return <CircularProgress/>

        return <div>Analysis: {analysis.id}, {analysis.mean}, {analysis.days_results.length}</div>
    }
}

const mapStateToProps = (state, props) => {
    const analysis = analysisSelectors.getCurrentAnalysis(state, props);

    return ({
        analysis: analysis
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        loadSingleAnalysis: (id) => dispatch(analysisActions.getSingleAnalysis(id)),

    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);