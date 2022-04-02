import axios from 'axios';

const proxyServer = 'todoServerHost';

export const todoService = {

    createTask(payload) {
        const encodedURI = window.encodeURI('/create');

        return axios({
            method: 'POST',
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