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
import { todoService } from '../../utils/todo-service';
import { validateCreatePayload } from '../../utils/input-validation';
import SimpleAlerts from '../snackbar';

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

export const ModalBox = ({ btnProps, data }) => {
    const [todoData, setTodoData] = useState({
        title: '',
        priority: '',
        status: 'progress',
        todo_type: '',
        description: ''
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();

        const { innerHTML } = e.target;

        if (innerHTML === 'edit') {
            setTodoData(data);
        }
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

    const alertprops = {
        severity: "warning",
        msg: "Input field cannot be empty"
    };

    const createUpdateToDoTask = (e) => {
        e.preventDefault();
        const isPayloadInValid = validateCreatePayload(todoData);

        if (isPayloadInValid) {
            <SimpleAlerts {...alertprops} />
            return;
        }

        todoService.createUpdateTask(todoData, btnProps.label, data?._id || '')
            .then(res => {
                if (res.statusCode !== 200) {
                    console.log(`Error creating task.` || res.message);
                    return;
                }
                console.log(res.message);
            }).catch(err => {
                console.log(err.message);
            });

        handleClose();
    };

    return (
        <div>
            <Button variant={btnProps.variant} name="create-edit-todo" value="create" label={btnProps.label} color="primary" size="small" onClick={handleClickOpen}>
                {btnProps.name}
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} disableBackdropClick={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {btnProps.label}
                </DialogTitle>
                <DialogContent dividers>
                    <form className={classes.root} noValidate autoComplete="on">
                        <TextField required name="title" label="Title" value={todoData.title}
                            onChange={handleInputChange} variant="outlined" />

                        <TextField select disabled={todoData.status === 'completed' ? true : false} required name="priority" label="Priority"
                            value={todoData.priority} onChange={handleInputChange} variant="outlined" helperText={todoData.status === 'completed' ? 'this is readonly' : ''}>
                            {
                                ToDoPriority.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField select required name="status" label="Status" value={todoData.status} onChange={handleInputChange}
                            disabled={todoData.status === 'completed' || btnProps.label === 'edit' ? false : true} defaultValue={todoData.status} variant="outlined">
                            {
                                ToDoStatus.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField select disabled={todoData.status === 'completed' ? true : false} required name="todo_type" label="Type"
                            value={todoData.todo_type} onChange={handleInputChange} variant="outlined" helperText={todoData.status === 'completed' ? 'this is readonly' : ''}>
                            {
                                ToDoType.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField required name="description" label="Description" value={todoData.description}
                            onChange={handleInputChange} variant="outlined" multiline row={6} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={createUpdateToDoTask} color="primary">
                        {btnProps.label}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
