import React, {Component} from 'react';
import {connect} from "react-redux";
import * as analysisActions from "../../redux/analysis/actions";
import * as analysisSelectors from "../../redux/analysis/selectors";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
    },
};

class AnalysisList extends Component {

    componentDidMount() {
        const {loadAnalysis, pagination} = this.props;
        loadAnalysis(pagination);
    }

    render() {
        return (
            <List component="nav" styles={styles.root}>
                {this.props.analysis.map(analysis => {
                    return (
                        <ListItem button key={analysis.id}>
                            <ListItemText inset
                                          primary={analysis.text}
                                          secondary={analysis.date_of_analysis}
                            />
                            <div style={{color: "gray"}}>
                                Mean: {analysis.mean}
                            </div>
                        </ListItem>)
                })}

            </List>
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
        loadAnalysis: (pagination) => analysisActions.getAnalysis(pagination, dispatch),
        loadNrOfAnalysis: () => analysisActions.getNumberOfAnalysis(dispatch)
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);