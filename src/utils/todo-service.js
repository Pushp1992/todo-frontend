import axios from 'axios';

const proxyServer = 'todoServerHost';

export const todoService = {

    createUpdateTask(payload, operationType, taskId) {
        let encodedURI;
        let httpMethod;

        if (operationType === 'create') {
            httpMethod = 'POST';
            encodedURI = window.encodeURI('/create');
        }
        if (operationType === 'edit') {
            httpMethod = 'PUT';
            encodedURI = window.encodeURI(`/update/${taskId}`);
        }

        return axios({
            method: httpMethod,
            data: payload,
            url: encodedURI,
            "headers": {
                'Content-Type': 'application/json',
                'server': proxyServer
            }
        }).then(res => {
            return res.data
        }).catch(err => {
            return err.message;
        });
    },

    removeTask(taskId) {
        const encodedURI = window.encodeURI(`/delete/${taskId}`);

        return axios({
            method: 'DELETE',
            url: encodedURI,
            "headers": {
                'Content-type': 'application/json',
                'server': proxyServer
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            console.log(err.message);
        });
    },

    fetchTaskList() {
        const encodedURI = window.encodeURI('/fetch');

        return axios({
            method: 'GET',
            url: encodedURI,
            "headers": {
                'Content-Type': 'pplication/json',
                'server': proxyServer
            }
        }).then((res) => {
            return res.data;
        });
    }
};