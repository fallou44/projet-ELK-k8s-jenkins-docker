const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the logging service!');
});
// Endpoint pour envoyer un message générique à Logstash
app.post('/messages', async (req, res) => {
    const { message } = req.body;

    try {
        await axios.post('http://logstash:5044', { message });
        res.status(201).send({ status: 'Message sent' });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).send({ error: 'Failed to send message', details: error.message });
    }
});

// Endpoint pour envoyer un message système (simuler un log système)
app.post('/logs/system', async (req, res) => {
    const { level, description } = req.body;

    try {
        const log = {
            timestamp: new Date().toISOString(),
            level: level || 'info',
            description: description || 'System event occurred',
        };
        await axios.post('http://logstash:5044', { message: log });
        res.status(201).send({ status: 'System log sent' });
    } catch (error) {
        console.error('Error sending system log:', error.message);
        res.status(500).send({ error: 'Failed to send system log', details: error.message });
    }
});

// Endpoint pour simuler un événement utilisateur
app.post('/logs/user', async (req, res) => {
    const { userId, action } = req.body;

    try {
        const log = {
            timestamp: new Date().toISOString(),
            userId,
            action,
            message: `User ${userId} performed ${action}`,
        };
        await axios.post('http://logstash:5044', { message: log });
        res.status(201).send({ status: 'User log sent' });
    } catch (error) {
        console.error('Error sending user log:', error.message);
        res.status(500).send({ error: 'Failed to send user log', details: error.message });
    }
});

// Endpoint pour simuler une erreur critique
app.post('/logs/error', async (req, res) => {
    const { errorMessage, errorCode } = req.body;

    try {
        const log = {
            timestamp: new Date().toISOString(),
            errorMessage: errorMessage || 'Unknown error occurred',
            errorCode: errorCode || 500,
        };
        await axios.post('http://logstash:5044', { message: log });
        res.status(201).send({ status: 'Error log sent' });
    } catch (error) {
        console.error('Error sending error log:', error.message);
        res.status(500).send({ error: 'Failed to send error log', details: error.message });
    }
});

// Endpoint pour récupérer le statut de l'application
app.get('/status', (req, res) => {
    res.status(200).send({ status: 'Application is running', timestamp: new Date() });
});

// Endpoint pour générer des logs en masse
app.post('/logs/bulk', async (req, res) => {
    const { count } = req.body;

    try {
        const logs = Array.from({ length: count || 10 }, (_, i) => ({
            timestamp: new Date().toISOString(),
            level: 'info',
            message: `Bulk log message ${i + 1}`,
        }));

        for (const log of logs) {
            await axios.post('http://logstash:5044', { message: log });
        }

        res.status(201).send({ status: `${logs.length} bulk logs sent` });
    } catch (error) {
        console.error('Error sending bulk logs:', error.message);
        res.status(500).send({ error: 'Failed to send bulk logs', details: error.message });
    }
});

// Lancer l'application
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
