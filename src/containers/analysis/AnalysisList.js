import React, {Component} from 'react';
import {connect} from "react-redux";
import * as analysisActions from "../../redux/analysis/actions";
import * as analysisSelectors from "../../redux/analysis/selectors";

class AnalysisList extends Component {

    componentDidMount() {
        this.props.loadAnalysis()
    }

    render() {
        return (
            <div>AnalysisList
                {this.props.analysis.length}</div>)
    }
}


const mapStateToProps = (state, props) => {
    const analysis = analysisSelectors.getAnalysis(state, props);

    return ({
        analysis: analysis
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        loadAnalysis: () => analysisActions.getAnalysis(dispatch),
        loadNrOfAnalysis: () => analysisActions.getNumberOfAnalysis(dispatch)
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);