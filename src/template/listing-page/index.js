import React, { useState, useEffect } from 'react';
import { CardList } from '../../component/card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { ModalBox } from '../../component/create-modal-box';
import { todoService } from '../../utils/todo-service';
import './listing-page.css';

const ListingPage = () => {
    const [taskList, setTaskList] = useState([]);
    let wipTaskData = {};
    let completedTaskData = {};

    const btnProps = {
        name: 'Create your own ToDo',
        label: 'create',
        variant: 'outlined'
    };

    useEffect(() => {
        // fetch ToDo List from Get API
        fetchToDoList();
    }, []);

    const fetchToDoList = () => {
        todoService.fetchTaskList()
            .then(res => {
                if (res.statusCode !== 200) {
                    setTaskList([]);
                    console.log('Empty task list');
                    return;
                }
                setTaskList(res.data);
            }).catch(err => {
                setTaskList([]);
                console.log(`Error getting task list. ${err.message}`);
                return;
            });
    };

    if (taskList.length) {
        const wipTask = [];
        const completedTask = [];

        taskList.forEach((task) => {
            if (task.status === 'completed') {
                completedTask.push(task);
            } else {
                wipTask.push(task);
            }
        });
        wipTaskData.taskData = wipTask;
        completedTaskData.taskData = completedTask;
    }
    return (
        <div className="list-page">
            <Container className='list-page--container' maxWidth="lg">
                <Grid className="list-page--items" container spacing={3} direction="row" justifyContent="center" alignItems="flex-start">
                    {
                        taskList.length ?
                            <>
                                <Grid className="list-page--items-inprogress" item xs={12} sm={4} md={4}>
                                    <Typography color="textSecondary">To Do</Typography>
                                    <CardList {...wipTaskData} />
                                </Grid> &nbsp;&nbsp;
                                <Grid className="list-page--items-completed" item xs={12} sm={4} md={4}>
                                    <Typography color="textSecondary">Completed</Typography>
                                    <CardList {...completedTaskData} />
                                </Grid>
                            </>
                            :
                            <Grid item xs={12} sm={6} md={6}>
                                <ModalBox btnProps={btnProps} />
                            </Grid>
                    }
                </Grid>
            </Container>
        </div>
    )
}
export default ListingPage;
