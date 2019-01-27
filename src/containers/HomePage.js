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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const paperDivStyle = {
    paddingTop: "30px"
};
const paperStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: 'grey',
    fontFamily: 'Sans-serif',
};

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        this.props.loadNrOfAnalysis();
        this.props.loadNrOfAnalysisPending();
    }

    pageIsLoading() {
        const {analysisCount, analysisPendingCount} = this.props;
        return analysisCount == null || analysisPendingCount == null;
    }

    handleChange(event) {
        this.setState({text: event.target.value})
    }

    submit() {
        this.props.submitNewAnalysis(this.state.text).then(() => {
            this.setState({text: ""})
            this.refresh();
        })
    }

    renderHowDoesItWorkPaper() {
        return (
            <div style={paperDivStyle}>
                <Paper style={paperStyle} elevation={1}>
                    <Typography variant="h5" component="h3">
                        How does it work?
                    </Typography>
                    You can submit a phrase which you are interested in and the application will look
                    for the most popular tweets with that phrase. Next it will evalutae the text sentiment
                    in those tweets and give value to each of them from 100% (best) to -100% (worst). You
                    can checkout how your favourite brand is doing, your country`s politicians or hollywood
                    actors. Before submitting new analysis please provide you twitter api authentication data.
                    Please note: the time of calculating one analysis may vary, depending on your PC specs.
                </Paper>
            </div>
        )
    }

    renderSummaryPaper() {
        const {analysisCount, analysisPendingCount} = this.props;

        let pendingText = ".";
        if (analysisPendingCount > 0) {
            pendingText = " and " + analysisPendingCount + " still being calculated."
        }
        return (
            <div style={paperDivStyle}>
                <Paper style={paperStyle} elevation={1}>
                    <Typography variant="h5" component="h3">
                        There are currently {analysisCount} analysis available{pendingText}
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

                    <TextField
                        value={this.state.text}
                        onChange={this.handleChange}
                    /><Button onClick={this.submit}>Submit</Button>
                </Paper>
            </div>
        )
    }

    render() {
        if (this.pageIsLoading()) return <CircularProgress/>;

        return (
            <div className="App">
                {this.renderHowDoesItWorkPaper()}
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
        loadNrOfAnalysis: () => dispatch(analysisActions.getNumberOfAnalysis()),
        loadNrOfAnalysisPending: () => dispatch(analysisPendingActions.getNumberOfPendingAnalysis()),
        submitNewAnalysis: (text) => dispatch(analysisPendingActions.submitAnalysisPending(text))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
