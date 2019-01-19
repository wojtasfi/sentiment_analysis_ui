import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as analysisActions from '../redux/analysis/actions'
import * as analysisPendingActions from '../redux/analysispending/actions'
import * as analysisSelectors from '../redux/analysis/selectors'
import * as analysisPendingSelectors from '../redux/analysispending/selectors'
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

const paperDivStyle = {
    paddingTop: "30px"
};
const paperStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px"
};

class HomePage extends Component {

    componentDidMount() {
        this.props.loadNrOfAnalysis();
        this.props.loadNrOfAnalysisPending();
    }

    pageIsLoading() {
        const {analysisCount, analysisPendingCount} = this.props;
        return analysisCount == null || analysisPendingCount == null;
    }

    renderSummaryPaper() {
        const {analysisCount, analysisPendingCount} = this.props;

        let pendingText = "";
        if (analysisPendingCount > 0) {
            pendingText = analysisPendingCount + " are still being calculated."
        }
        return (
            <div style={paperDivStyle}>
                <Paper style={paperStyle} elevation={1}>
                    <Typography variant="h5" component="h3">
                        There are currently {analysisCount} analysis available.
                        {pendingText}
                    </Typography>
                    You can check them {<Link to={'/analysis'}>here</Link>}
                </Paper>
            </div>
        )
    }

    renderSubmitPaper() {
        return (
            <div style={paperDivStyle}>
                <Paper style={paperStyle} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Submit new analysis
                    </Typography>
                    You can check them {<Link to={'/analysis'}>here</Link>}
                </Paper>
            </div>
        )
    }

    render() {
        if (this.pageIsLoading()) return <CircularProgress/>

        return (
            <div className="App">
                {this.renderSummaryPaper()}
                {this.renderSubmitPaper()}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const analysisCount = analysisSelectors.getAnalysisCount(state, props);
    const analysisPendingCount = analysisPendingSelectors.getAnalysisPendingCount(state, props);

    return ({
        analysisCount: analysisCount,
        analysisPendingCount: analysisPendingCount
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        loadNrOfAnalysis: () => analysisActions.getNumberOfAnalysis(dispatch),
        loadNrOfAnalysisPending: () => analysisPendingActions.getNumberOfPendingAnalysis(dispatch)
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
