import React, {Component} from 'react';
import * as analysisSelectors from "../../redux/analysis/selectors";
import {connect} from "react-redux";
import * as analysisActions from "../../redux/analysis/actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Chart} from "react-google-charts";

const styles = {
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    paper: {
        padding: 10,
        textAlign: 'center',
        height: 150,
        fontSize: 28,
    },
    titlePaper: {
        padding: 10,
        textAlign: 'center',
        height: 50,
        fontFamily: 'Sans-serif',
        weight: 400
    },
    paperChart: {
        padding: 10,
        textAlign: 'center',
        height: 300
    },
    title: {
        fontFamily: 'Sans-serif',
        fontSize: 24,
    },
    value: {
        fontSize: 28,
        color: 'grey',
        fontFamily: 'Sans-serif',
        paddingTop: 35
    }
};

class Analysis extends Component {

    constructor(props){
        super(props);

        this.state = {
                chartVariable: 'Mean',
        }
    }
    componentDidMount() {
        const {match: {params}, history, loadSingleAnalysis} = this.props;

        loadSingleAnalysis(params.analysisId)
    }

    isLoading() {
        const {analysis} = this.props;
        if (analysis == null) return true;
        return false
    }

    renderDataItem(title, value) {
        return (
            <Grid item xs={6}>
                <Paper style={styles.paper}
                       onClick={() => this.setState({chartVariable: title})}>
                    <div style={styles.title}>
                        {title}
                    </div>
                    <div style={styles.value}>
                        {value} %
                    </div>
                </Paper>
            </Grid>
        )
    }


    renderChart(){
        const {analysis} = this.props;
        const {chartVariable} = this.state;
        console.log(chartVariable);
        const data = [];
        data.push(['x', chartVariable]);
        analysis.days_results.forEach( result =>{
            data.push([result.date, result[chartVariable.toLowerCase()]]);

        });
        const options={
            hAxis: {
                title: 'Date',
            },
            vAxis: {
                title: chartVariable,
            },
        };

        return (
            <Grid item xs={12}>
                <Paper style={styles.paperChart}>

                    <Chart
                        chartType="LineChart"
                        data={data}
                        options={options}
                        legendToggle
                        style={{height:280}}
                    />
                </Paper>
            </Grid>
        )

    }

    render() {
        const {analysis} = this.props;

        if (this.isLoading()) return <CircularProgress/>;


        return (
            <div>
                <Grid style={styles.root} container spacing={16}
                      alignItems="center"
                      justify="center">
                    <Grid item xs={12}>
                        <Paper style={styles.titlePaper}>

                            <div style={styles.title}>
                                {this.props.analysis.text}
                            </div>
                        </Paper>
                    </Grid>

                    {this.renderDataItem('Mean', analysis.mean)}
                    {this.renderDataItem('Median', analysis.median)}
                    {this.renderDataItem('Best', analysis.best)}
                    {this.renderDataItem('Worst', analysis.worst)}
                </Grid>
                <Grid style={styles.root} container spacing={16}>
                    {this.renderChart()}
                </Grid>
            </div>
        )
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