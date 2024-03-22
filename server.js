require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const winston = require('winston');

function main() {
    const server = express();
    server.use(express.json());
    server.use(cors());
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.service} ${info.level}: ${info.message}`)
        ),
        defaultMeta: { service: 'gateway-service' },
        transports: [
            new winston.transports.Console(),
        ],
    });

    server.listen(4555, () => {
        logger.info('Server is listening');
    });

    server.put('/api/register', async (req, res) => {
        logger.info(`PUT /api/register wurde aufgerufen.`);
        const user = req.body;

        try {
            logger.info(`PUT /api/register -> sende User an User Service`);
            const userResponse = await axios.put(process.env.USER_SERVICE_URL + '/api/user', user);
            if (userResponse.status === 200) {
                res.status(200).send({message: 'PUT /api/register -> User erfolgreich registriert'});
            } else {
                res.status(500).send({message: 'PUT /api/register -> Fehler beim Registrieren des Users, user in firebase erstellt aber nicht im system, admin kontaktieren' });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).send({message: 'PUT /api/register -> Fehler beim Registrieren des Users'});
        }
    });

    server.get('/api/quests', async (req, res) => {
        logger.info(`GET /api/quests wurde aufgerufen.`);

        try {
            logger.info(`GET /api/quests -> Users werden von UserService angefordert.`);
            const response = await axios.get(process.env.QUEST_SERVICE_URL + '/api/quests');

            if (response.status === 200) {
                res.status(200).send(response.data);
            } else {
                res.status(500).send('GET /api/quests -> Fehler beim Abfragen der Quests vom QuestService');
            }
        } catch (error) {
            logger.error(error);
            res.status(500).send('GET /api/quests -> Fehler beim Abfragen der Quests vom QuestService');
        }
    });

    server.post('/api/quests', async (req, res) => {
        logger.info(`POST /api/quests wurde aufgerufen.`);
        const quest = req.body;
        try {
            logger.info(`POST /api/quests -> sende Quest an Quest Service`);

            const response = await axios.post(process.env.QUEST_SERVICE_URL + '/api/quests', quest);

            if (response.status === 200) {
                res.status(200).send({message: 'POST /api/quests -> Quest erfolgreich gesendet'});
            } else {
                res.status(500).send('POST /api/quests -> Fehler beim Senden der Quest');
            }
        } catch (error) {
            logger.error(error);
            res.status(500).send('POST /api/quests -> Fehler beim Senden der Quest');
        }
    });

    server.get('/api/quests/:id', async (req, res) => {
        const id = req.params.id;
        logger.info(`GET /api/quest:${id} wurde aufgerufen.`);
        try {
            logger.info(`GET /api/quest:${id} -> Quest wird vom Quest Service angefordert.`);
            const response = await axios.get(process.env.QUEST_SERVICE_URL + '/api/quests/' + id);
            logger.info(response.data);
            res.status(200).send(response.data);
            logger.info(`GET /api/quests/:${id} -> Quest ist ans Frontend gesendet.`);
        } catch (error) {
            logger.error(error);
            if (error.response && error.response.status === 404) {
                res.status(404).send('GET /api/quests/:${id} -> Quest nicht gefunden');
            } else {
                res.status(500).send('GET /api/quests/:${id} -> Fehler beim Abfragen der Quest vom Microservice');
            }
        }
    });

    server.get('/api/user', async (req, res) => {
        logger.info(`GET /api/user wurde aufgerufen.`);
        try {
            logger.info(`GET /api/user -> Users werden von UserService angefordert.`);
            const response = await axios.get(process.env.USER_SERVICE_URL + '/api/user');

            if (response.status === 200) {
                res.status(200).send(response.data);
            } else {
                res.status(500).send('GET /api/user ->Fehler beim Abfragen der User vom Microservice');
            }
        } catch (error) {
            logger.error(error);
            res.status(500).send('GET /api/user ->Fehler beim Abfragen der User vom Microservice');
        }
    });

    server.post('/api/user', async (req, res) => {
        logger.info(`POST /api/user wurde aufgerufen.`);
        const user = req.body;

        try {
            logger.info(`POST /api/user -> sende user an UserService`);
            const response = await axios.post(process.env.USER_SERVICE_URL + '/api/user', user);

            if (response.status === 200) {
                res.status(200).send('POST /api/user -> User erfolgreich an den Microservice gesendet');
            } else {
                res.status(500).send('POST /api/user -> Fehler beim Senden des Users an den Microservice');
            }
        } catch (error) {
            logger.error(error);
            res.status(500).send('POST /api/user -> Fehler beim Senden des Users an den Microservice');
        }
    });

    server.get('/api/user/:id', async (req, res) => {
        const id = req.params.id;
        logger.info(`GET /api/user/:${id} wurde aufgerufen.`);
        try {
            logger.info(`GET /api/user/:${id} -> Benutzer werden von UserService angefordert.`);
            const url = process.env.USER_SERVICE_URL + '/api/user/' + id;
            logger.info(`GET /api/user/:${id} -> url called:` + url)
            const response = await axios.get(url);
            res.status(200).send(response.data);
            logger.info(`GET /api/user/:${id} -> Benutzer ans Frontend gesendet.`);
        } catch (error) {
            logger.error(error);
            if (error.response && error.response.status === 404) {
                res.status(404).send(`GET /api/user/:${id} -> Benutzer nicht gefunden`);
            } else {
                res.status(500).send(`GET /api/user/:${id} -> Fehler beim Abfragen der Benutzer vom Microservice`);
            }
        }
    });
}

main();