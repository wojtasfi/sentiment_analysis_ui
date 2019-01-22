import React, {Component} from 'react';
import {connect} from "react-redux";
import * as analysisPendingActions from "../../redux/analysispending/actions";
import * as analysisPendingSelectors from "../../redux/analysispending/selectors";

class AnalysisPendingList extends Component {

    componentDidMount() {
        this.props.loadAnalysisPending();
        this.props.loadNrOfPendingAnalysis();
    }

    render() {
        return (
            <div>AnalysisPendingList
                {this.props.analysisPending.length}
            </div>)
    }
}


const mapStateToProps = (state, props) => {
    const analysisPending = analysisPendingSelectors.getAnalysisPending(state, props);

    return ({
        analysisPending: analysisPending
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        loadAnalysisPending: () => dispatch(analysisPendingActions.getAnalysisPending()),
        loadNrOfPendingAnalysis: () => dispatch(analysisPendingActions.getNumberOfPendingAnalysis())
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisPendingList);