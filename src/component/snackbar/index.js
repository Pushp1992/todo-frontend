import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts(props) {
    const classes = useStyles();

    console.log('props', props);

    // severity type: ['error', 'warning', 'info', 'success']

    return (
        <div className={classes.root}>
            <Alert severity={props.severity}>{props.msg}</Alert>
        </div>
    );
};