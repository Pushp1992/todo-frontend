import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { ModalBox } from '../create-modal-box';
import { todoService } from '../../utils/todo-service';

const styles = {
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

export const CardList = (props) => {
    const bull = <span className={styles.bullet}>•</span>;
    const [taskData, setTaskData] = useState([]);

    // !! BUG: re-rendering of this component is not hapening whenever taskData.length changes
    useEffect(() => {
        setTaskData(props.taskData)
    }, [props.taskData.length]);

    const btnProps = {
        name: 'edit',
        variant: 'none',
        label: 'edit'
    };

    const handleCardOperation = (e, id) => {
        e.preventDefault();
        todoService.removeTask(id)
            .then(res => {
                if (res.statusCode !== 200) {
                    console.log(`Error deleting task. iD: ${id}` || res.message);
                    return;
                }
                console.log(res.message);
                props.setCrudOperationPerformed(true);
            }).catch(err => {
                console.log(err.message);
                return;
            });
    };

    return (
        <>
            {
                (taskData || []).map((task) => {
                    return (
                        <Card key={task.id} className={styles.root} variant="outlined" style={{ backgroundColor: props.bgColor }}>
                            <CardContent>
                                <Typography className={styles.title} gutterBottom>
                                    {`Id: ${task._id.slice(18)}`}
                                </Typography>
                                <Typography className={styles.title} gutterBottom>
                                    {task?.title || ''}
                                </Typography>
                                <Typography>
                                    <Chip variant="outlined" color="primary" size="small" label={task.priority} /> &nbsp;
                                     <Chip color="primary" size="small" label={task.todo_type} />
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {task.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ModalBox btnProps={btnProps} data={task} />
                                <Button size="small" color='secondary' name="delete" onClick={(e) => handleCardOperation(e, task._id)}>delete</Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </>
    )
}