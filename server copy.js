const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/messages', async (req, res) => {
    const { message } = req.body;

    try {
        // Envoyer le message à Logstash
        // await axios.post('http://localhost:5044', { message });
        // await axios.post('http://logstash:5044', { message });
        await axios.post('http://logstash:5044', { message: "bien fait comme message" });
        res.status(201).send({ status: 'Message sent' });
    } 
    // catch (error) {
    //     console.error(error); // Log l'erreur pour le débogage
    //     res.status(500).send({ error: 'Failed to send message' });
    // }
    catch (error) {
        console.error('Error sending message:', error.message); // Log l'erreur avec le message
        res.status(500).send({ error: 'Failed to send message', details: error.message });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
