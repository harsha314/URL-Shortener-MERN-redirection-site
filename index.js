require('dotenv').config();

const axios = require('axios');
const express = require('express');

const urlParse = require('url-parse');

const { APP_URL, API_URL, PORT } = require('./env');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(APP_URL);
    res.status(301).redirect(APP_URL);
});

app.get('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    const setLongUrl = async () => {
        try {
            const url = await axios.get(`${API_URL}/${shortUrl}`);

            let { longUrl } = url.data;
            if (longUrl) {
                longUrl = urlParse(longUrl);
                longUrl.protocol = 'https';
                longUrl.slashes = true;

                return res.status(301).redirect(longUrl.toString());
            }
            return res.status(404).send('404 not found');
        } catch (e) {
            console.log(e.message);
            res.status(404).send('<h1>404 not found</h1>');
        }
    };
    setLongUrl();
});

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});
