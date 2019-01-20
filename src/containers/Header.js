import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Route} from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
    bar : {
        height: 60
    },
    content : {
        paddingTop: 5
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };

        this.openMenu = this.openMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
        this.navigate = this.navigate.bind(this)
    }

    openMenu(event) {
        this.setState({anchorEl: event.currentTarget});
    };

    navigate(route, history){
        history.push(route);
        this.closeMenu()
    }
    closeMenu() {
        this.setState({anchorEl: null});
    }


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
                        <Typography variant="h6" color="inherit">
                            Sentiment analysis
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


export default Header