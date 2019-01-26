import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Route} from 'react-router-dom'
import * as homeSelectors from "../redux/home/selectors";
import * as homeActions from "../redux/home/actions";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import AuthDialog from "./AuthDialog";
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = {
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
    bar: {
        height: 60
    },
    content: {
        paddingTop: 5
    },
    inline: {
        display: 'inline',
        paddingLeft: 30
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            dialogOpen: false
        };

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        this.props.getTwitterAuthExists();
        this.props.getTwitterAuthError();
    }

    openMenu(event) {
        this.setState({anchorEl: event.currentTarget});
    };

    navigate(route, history) {
        history.push(route);
        this.closeMenu()
    }

    closeMenu() {
        this.setState({anchorEl: null});
    }

    closeDialog = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const {anchorEl} = this.state;

        return (
            <div style={styles.root}>
                <AppBar style={styles.bar} position="static">
                    <Toolbar style={styles.content} variant="dense">
                        <IconButton style={styles.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={this.openMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.closeMenu}
                        >
                            <Route render={({history}) => (
                                <div>
                                    <MenuItem onClick={() => {
                                        this.navigate('/', history)
                                    }}>Home</MenuItem>
                                    <MenuItem onClick={() => {
                                        this.navigate('/analysis', history)
                                    }}>Analysis</MenuItem>
                                    <MenuItem onClick={() => {
                                        this.navigate('/analysis/pending', history)
                                    }}>Pending analysis</MenuItem>
                                </div>
                            )}/>
                        </Menu>
                        <Typography variant="h4" color="inherit">
                            Sentiment analysis
                        </Typography>
                    </Toolbar>
                </AppBar>
                {this.renderCommunicationBar()}
                <AuthDialog onClose={this.closeDialog} dialogOpen={this.state.dialogOpen}/>


            </div>
        )
    }

    renderCommunicationBar() {
        const {twitterAuthExists, twitterAuthError} = this.props;
        if (!twitterAuthExists) {
            return (
                <Paper>
                    <div style={styles.inline}>
                        <Button style={styles.button} variant="contained"
                                onClick={() => this.setState({dialogOpen: true})}>Add Auth data</Button>
                        <Typography style={styles.inline} variant="h6" color="error">
                            Twitter authentication data is missing.
                        </Typography>
                    </div>
                </Paper>
            )
        } else if(twitterAuthExists && twitterAuthError !== null){
            const authStatusMsg = 'There is something wrong with your Twitter authorization data: ' + twitterAuthError
            return (
                <Paper>
                    <div style={styles.inline}>
                        <Button style={styles.button} variant="contained"
                                onClick={() => this.setState({dialogOpen: true})}>
                            Override Auth data</Button>
                        <Typography style={styles.inline} variant="h6" color="error">
                            {authStatusMsg}
                        </Typography>
                    </div>
                </Paper>
            )
        }
    }

}

const mapStateToProps = (state, props) => {
    const twitterAuthExists = homeSelectors.getTwitterAuthExists(state, props);
    let twitterAuthError = homeSelectors.getTwitterAuthError(state, props);

    return ({
        twitterAuthExists: twitterAuthExists,
        twitterAuthError: twitterAuthError
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        submitTwitterAuth: (auth) => dispatch(homeActions.submitTwitterAuth(auth)),
        getTwitterAuthExists: () => dispatch(homeActions.getTwitterAuthExists()),
        getTwitterAuthError: () => dispatch(homeActions.getTwitterAuthError())
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)