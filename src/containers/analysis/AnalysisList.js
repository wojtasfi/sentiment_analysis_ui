import React, {Component} from 'react';
import {connect} from "react-redux";
import * as analysisActions from "../../redux/analysis/actions";
import * as analysisSelectors from "../../redux/analysis/selectors";
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PaginationPanel from "./PaginationPanel";

const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
    },
    paperDivStyle: {
        paddingTop: "30px"
    }
};

class AnalysisList extends Component {

    componentDidMount() {
        const {loadAnalysis, loadNrOfAnalysis} = this.props;
        loadAnalysis();
        loadNrOfAnalysis();
    }

    render() {
        return (
            <div style={styles.paperDivStyle}>
                <PaginationPanel/>
                <List component="nav" styles={styles.root}>
                    {this.props.analysis.map(analysis => {
                        return (
                            <ListItem button key={analysis.id}>
                                <ListItemText primary={analysis.text}
                                              secondary={analysis.date_of_analysis}
                                />
                                <div style={{color: "gray"}}>
                                    Mean: {analysis.mean} %
                                </div>
                            </ListItem>)
                    })}

                </List>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    const analysis = analysisSelectors.getAnalysis(state, props);
    let pagination = analysisSelectors.getPagination(state, props);

    return ({
        analysis: analysis,
        pagination: pagination
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        loadAnalysis: () => dispatch(analysisActions.getAnalysis()),
        loadNrOfAnalysis: () => dispatch(analysisActions.getNumberOfAnalysis()),

    })
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);