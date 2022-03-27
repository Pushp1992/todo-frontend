import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { ToDoType, ToDoPriority, ToDoStatus } from '../../utils/constraints';

// styled-component is used exclusively for this Dialog-box
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const ModalBox = () => {
    const [todoData, setTodoData] = useState({
        title: '',
        priority: '',
        status: '',
        todo_type: '',
        description: ''
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name: selectedAttribte, value: selectedvalue } = e.target;
        setTodoData({ ...todoData, [selectedAttribte]: selectedvalue });
    };

    const createToDoTask = (e) => {
        e.preventDefault();
;
        // There could have been more optimal way to generate id for each object
        // IMO, in MongoDb, this ID will be auto generated, while creating POST reqest
        const randomId = Math.floor(Math.random()*(999-100+1)+100);
        const payloadData = {...todoData, id: randomId}

        console.log(payloadData);
        // setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                Create your own ToDo
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField required name="title" label="Todo Title" defaultValue={todoData.title} onChange={handleInputChange} variant="outlined" />
                        <TextField select required name="priority" label="todo_priority" value={todoData.priority} onChange={handleInputChange} variant="outlined">
                            {
                                ToDoPriority.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField select required name="status" label="todo_status" value={todoData.status} onChange={handleInputChange} variant="outlined">
                            {
                                ToDoStatus.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField select required name="todo_type" label="todo_type" value={todoData.todo_type} onChange={handleInputChange} variant="outlined">
                            {
                                ToDoType.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField required name="description" label="todo_desc" defaultValue={todoData.description} onChange={handleInputChange} variant="outlined" multiline row={6} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={createToDoTask} color="primary">
                        Save changes
             </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
