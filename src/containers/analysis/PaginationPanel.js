import React, {Component} from 'react';
import * as analysisSelectors from "../../redux/analysis/selectors";
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import * as analysisActions from "../../redux/analysis/actions";

const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        text: {
            color: 'grey',
            fontFamily: 'Sans-serif'
        },
        select: {
            color: 'grey',
            fontFamily: 'Sans-serif',

        },
        inline: {
            display: 'inline',
            paddingLeft: 30
        },
        description: {paddingRight: 10}
    }
;

class PaginationPanel extends Component {

    constructor(props) {
        super(props);

        this.pageForward = this.pageForward.bind(this);
        this.pageBack = this.pageBack.bind(this);
        this.changeSize = this.changeSize.bind(this)
        this.changeSort = this.changeSort.bind(this)
        this.changeOrder = this.changeOrder.bind(this)
    }

    pageForward() {
        const {pagination, changePage} = this.props;
        if (pagination.page === pagination.pageNumber) {
            return
        }

        changePage(pagination.page + 1);
    }

    pageBack() {
        const {pagination, changePage} = this.props;

        if (pagination.page === 1) {
            return
        }

        changePage(pagination.page - 1);
    }

    changeSize(event) {
        const {pagination, changeSize} = this.props;

        const newSize = event.target.value;
        if (pagination.size === newSize) return;

        changeSize(newSize);
    }

    changeSort(event) {
        const {pagination, changeSort} = this.props;

        const newSort = event.target.value;
        if (pagination.sort === newSort) return;

        changeSort(newSort);
    }

    changeOrder(event) {
        const {pagination, changeOrder} = this.props;

        const newOrder = event.target.value;
        if (pagination.order === newOrder) return;

        changeOrder(newOrder);
    }

    render() {
        const {pagination} = this.props;
        return (
            <div>
                <div style={styles.inline}>
                    <IconButton onClick={this.pageBack}><ArrowBack/></IconButton>
                    <span style={styles.text}>Page: {pagination.page}</span>
                    <IconButton onClick={this.pageForward}><ArrowForward/></IconButton>
                </div>
                <div style={styles.inline}>
                    <InputLabel style={styles.description} htmlFor="size-simple">Size:</InputLabel>
                    <Select style={styles.select}
                            value={pagination.size}
                            onChange={this.changeSize}
                            inputProps={{
                                name: 'size',
                                id: 'size-simple',
                            }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </div>
                <div style={styles.inline}>
                    <InputLabel style={styles.description} htmlFor="sort-simple">Sort:</InputLabel>

                    <Select style={styles.select}
                            value={pagination.sort}
                            onChange={this.changeSort}
                            inputProps={{
                                name: 'sort',
                                id: 'sort-simple',
                            }}
                    >
                        <MenuItem value={'mean'}>Mean</MenuItem>
                        <MenuItem value={'text'}>Analysed text</MenuItem>
                        <MenuItem value={'date_of_analysis'}>Date</MenuItem>
                    </Select>
                </div>

                <div style={styles.inline}>
                    <InputLabel style={styles.description} htmlFor="order-simple">Order:</InputLabel>

                    <Select style={styles.select}
                            value={pagination.order}
                            onChange={this.changeOrder}
                            inputProps={{
                                name: 'order',
                                id: 'order-simple',
                            }}
                    >
                        <MenuItem value={'asc'}>Ascending</MenuItem>
                        <MenuItem value={'desc'}>Descending</MenuItem>
                    </Select>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    let pagination = analysisSelectors.getPagination(state, props);

    return ({
        pagination: pagination
    })
};
const mapDispatchToProps = () => (dispatch) => {
    return ({
        changePage: (page) => dispatch(analysisActions.changePage(page, dispatch)),
        changeSize: (size) => dispatch(analysisActions.changeSize(size, dispatch)),
        changeSort: (sort) => dispatch(analysisActions.changeSort(sort, dispatch)),
        changeOrder: (order) => dispatch(analysisActions.changeOrder(order, dispatch))

    })
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationPanel);