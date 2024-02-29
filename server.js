require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

function main() {
    const server = express();
    server.use(express.json());
    server.use(cors());

    server.listen(4555, () => {
        console.log('Gateway Server is listening....');
    });

    server.post('/api/register', async (req, res) => {
        console.log(`Gateway Service: POST /api/register wurde aufgerufen.`);

        const user = req.body;
        try {
            console.log(`Gateway Service: POST /api/register -> sende User an Auth Service`);

            const response = await axios.post(process.env.AUTH_SERVICE_URL + '/api/register', user);

            if (response.status === 200) {
                console.log(`Gateway Service: POST /api/register -> sende User an User Service`);
                const userResponse = await axios.post(process.env.USER_SERVICE_URL + '/api/user', user);
                if (userResponse.status === 200) {
                    res.status(200).send('Gateway Service: POST /api/register -> User erfolgreich registriert');
                } else {
                    res.status(500).send('Gateway Service: POST /api/register -> Fehler beim Registrieren des Users, user in firebase erstellt aber nicht im system, admin kontaktieren');
                }
            } else {
                res.status(500).send('Gateway Service: POST /api/register -> Fehler beim Registrieren des Users');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Gateway Service: POST /api/register -> Fehler beim Registrieren des Users');
        }
    });

    server.get('/api/quests', async (req, res) => {
        console.log(`Gateway Service: GET /api/quests wurde aufgerufen.`);

        try {
            console.log(`Gateway Service: GET /api/quests -> Users werden von UserService angefordert.`);
            const response = await axios.get(process.env.QUEST_SERVICE_URL + '/api/quests');

            if (response.status === 200) {
                console.log(response.data);
                res.status(200).send(response.data);
            } else {
                res.status(500).send('Gateway Service: GET /api/quests -> Fehler beim Abfragen der Quests vom QuestService');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Gateway Service: GET /api/quests -> Fehler beim Abfragen der Quests vom QuestService');
        }
    });

    server.post('/api/quests', async (req, res) => {
        console.log(`Gateway Service: POST /api/quests wurde aufgerufen.`);
        const quest = req.body;
        try {
            console.log(`Gateway Service: POST /api/quests -> sende Quest an Quest Service`);

            const response = await axios.post(process.env.QUEST_SERVICE_URL + '/api/quests', quest);

            if (response.status === 200) {
                res.status(200).send({message: 'Gateway Service: POST /api/quests -> Quest erfolgreich gesendet'});
            } else {
                res.status(500).send('Gateway Service: POST /api/quests -> Fehler beim Senden der Quest');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Gateway Service: POST /api/quests -> Fehler beim Senden der Quest');
        }
    });

    server.get('/api/quests/:id', async (req, res) => {
        const id = req.params.id;
        console.log(`Gateway Service: GET /api/quest:${id} wurde aufgerufen.`);
        try {
            console.log(`Gateway Service: GET /api/quest:${id} -> Quest wird vom Quest Service angefordert.`);
            const response = await axios.get(process.env.QUEST_SERVICE_URL + '/api/quests/' + id);
            console.log(response.data);
            res.status(200).send(response.data);
            console.log(`Gateway Service: GET /api/quests/:${id} -> Quest ist ans Frontend gesendet.`);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                res.status(404).send('Gateway Service: GET /api/quests/:${id} -> Quest nicht gefunden');
            } else {
                res.status(500).send('Gateway Service: GET /api/quests/:${id} -> Fehler beim Abfragen der Quest vom Microservice');
            }
        }
    });


    server.get('/api/user', async (req, res) => {
        console.log(`Gateway Service: GET /api/user wurde aufgerufen.`);
        try {
            console.log(`Gateway Service: GET /api/user -> Users werden von UserService angefordert.`);
            const response = await axios.get(process.env.USER_SERVICE_URL + '/api/user');

            if (response.status === 200) {
                console.log(response.data)
                res.status(200).send(response.data);
            } else {
                res.status(500).send('Gateway Service: GET /api/user ->Fehler beim Abfragen der User vom Microservice');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Gateway Service: GET /api/user ->Fehler beim Abfragen der User vom Microservice');
        }
    });

    server.post('/api/user', async (req, res) => {
        console.log(`Gateway Service: POST /api/user wurde aufgerufen.`);
        const user = req.body;

        try {
            console.log(`Gateway Service: POST /api/user -> sende user an UserService`);
            const response = await axios.post(process.env.USER_SERVICE_URL + '/api/user', user);

            if (response.status === 200) {
                res.status(200).send('Gateway Service: POST /api/user -> User erfolgreich an den Microservice gesendet');
            } else {
                res.status(500).send('Gateway Service: POST /api/user -> Fehler beim Senden des Users an den Microservice');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Gateway Service: POST /api/user -> Fehler beim Senden des Users an den Microservice');
        }
    });

    server.get('/api/user/:id', async (req, res) => {
        const id = req.params.id;
        console.log(`Gateway Service: GET /api/user/:${id} wurde aufgerufen.`);
        try {
            console.log(`Gateway Service: GET /api/user/:${id} -> Benutzer werden von UserService angefordert.`);
            const url = process.env.USER_SERVICE_URL + '/api/user/' + id;
            console.log(`Gateway Service: GET /api/user/:${id} -> url called:` + url)
            const response = await axios.get(url);
            res.status(200).send(response.data);
            console.log(`Gateway Service: GET /api/user/:${id} -> Benutzer ans Frontend gesendet.`);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                res.status(404).send(`Gateway Service: GET /api/user/:${id} -> Benutzer nicht gefunden`);
            } else {
                res.status(500).send(`Gateway Service: GET /api/user/:${id} -> Fehler beim Abfragen der Benutzer vom Microservice`);
            }
        }
    });
}

main();