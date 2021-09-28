require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();
const PORT = 8081;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const ERROR_MSG = 'Something wrong happened, try later...';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.post('/analyze-text', async (req, res) => {
    
    const { value } = req.body;
    
    const formdata = new FormData();
    formdata.append("key", API_KEY);
    formdata.append("url", value);
    formdata.append("lang", "en");
    
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: formdata
    });
    try {
        const responseParse = await response.json();
        if (responseParse.status && responseParse.status.code === '0') {
            res.send({status: 200, content: responseParse});
        } else {
            res.send({status: 500, error: ERROR_MSG});
        }
    }catch(e) {
        console.log("Error: ", e)
        res.send({status: 500, error: ERROR_MSG});
    }
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})
