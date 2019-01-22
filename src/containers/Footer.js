import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';

const styles = {
        text: {
            color: 'grey',
            fontFamily: 'Sans-serif',
            paddingTop: 30
        },
        root: {
            position: 'fixed',
            bottom: 20,
            width: '100%'
        }
    };

class Footer extends Component {
    render() {
        return (
            <div style={styles.root}>
                <Divider/>

                <div style={{paddingTop: 10}}>
                    <span style={styles.text}>Application created by Wojciech Figas</span>
                </div>
            </div>
        )

    }
}

export default Footer