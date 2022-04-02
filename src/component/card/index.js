import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { ModalBox } from '../create-modal-box';

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

    useEffect(() => {
        setTaskData(props.taskData)
    }, []);

    const btnProps = {
        name: 'edit',
        variant: 'none',
        label: 'edit'
    };

    const handleCardOperation = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {
                (taskData || []).map((task) => {
                    return (
                        <Card key={task.id} className={styles.root} variant="outlined">
                            <CardContent>
                                <Typography className={styles.title} color="textSecondary" gutterBottom>
                                    {`#TD-${task.id}`}
                                </Typography>
                                <Typography className={styles.title} color="textSecondary" gutterBottom>
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
                                <ModalBox btnProps = {btnProps} data={task} />
                                <Button size="small" color='secondary' name="delete" onClick={handleCardOperation}>delete</Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </>
    )
}