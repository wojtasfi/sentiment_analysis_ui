import React from 'react';
import * as homeSelectors from "../redux/home/selectors";
import * as homeActions from "../redux/home/actions";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class AuthDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            consumerKey: "",
            consumerSecret: "",
            accessToken: "",
            accessTokenSecret: "",
            error: null
        };

        this.handleTwitterAuthSubmit = this.handleTwitterAuthSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.renderAddOrOverrideButton = this.renderAddOrOverrideButton.bind(this);
    }

    componentDidMount() {

    }


    handleTwitterAuthSubmit() {
        const {consumerKey, consumerSecret, accessToken, accessTokenSecret} = this.state;
        this.setState({error: null});
        if (consumerKey === "" || consumerSecret === "" || accessToken === "" || accessTokenSecret === "") {
            this.setState({error: "All fields are required"});
            return
        }

        const auth = {
            consumerKey: consumerKey, consumerSecret: consumerSecret,
            accessToken: accessToken, accessTokenSecret: accessTokenSecret
        };

        this.props.submitTwitterAuth(auth);
        this.props.onClose();
    }

    handleTextFieldChange(event) {
        const {id, value} = event.target;
        this.setState({[id]: value});
    }

    render() {
        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add you Twitter App authentication</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth required
                               value={this.state.consumerKey}
                               margin="dense"
                               id="consumerKey"
                               label="Consumer Key"
                               onChange={this.handleTextFieldChange}
                    />
                    <TextField fullWidth required
                               value={this.state.consumerSecret}
                               margin="dense"
                               id="consumerSecret"
                               label="Consumer Secret"
                               onChange={this.handleTextFieldChange}
                    />
                    <TextField fullWidth required
                               value={this.state.accessToken}
                               margin="dense"
                               id="accessToken"
                               label="Access Token"
                               onChange={this.handleTextFieldChange}
                    />
                    <TextField fullWidth required
                               value={this.state.accessTokenSecret}
                               margin="dense"
                               id="accessTokenSecret"
                               label="Access Token Secret"
                               onChange={this.handleTextFieldChange}
                    />
                    <div style={{color: "red"}}>{this.state.error}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleTwitterAuthSubmit} color="primary">
                        {this.renderAddOrOverrideButton()}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderAddOrOverrideButton() {
        const {twitterAuthExists} = this.props

        if (twitterAuthExists) {
            return 'Override'
        }
        return 'Add'
    }
}

const mapStateToProps = (state, props) => {
    const twitterAuthExists = homeSelectors.getTwitterAuthExists(state, props);

    return ({
        twitterAuthExists: twitterAuthExists
    })
};

const mapDispatchToProps = () => (dispatch) => {
    return ({
        submitTwitterAuth: (auth) => dispatch(homeActions.submitTwitterAuth(auth))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthDialog)