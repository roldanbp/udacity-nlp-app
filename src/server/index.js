const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})
