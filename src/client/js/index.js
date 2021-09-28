require('../styles/app.scss');

const { doRequest } = require('./services/services');
const { isValidURL } = require('./util/util');

const input = document.querySelector('#input');
const button = document.querySelector('#button');
const resultContainer = document.querySelector('#content__result');
const model = document.querySelector('#model-value')
const agreement = document.querySelector('#agreement-value')
const confidence = document.querySelector('#confidence-value')
const irony = document.querySelector('#irony-value')
const subjectivity = document.querySelector('#subjectivity-value')
const score = document.querySelector('#score-value')
const loading = document.querySelector('#loading')
const errorMessage = document.querySelector('#message-error')

const loadingDataView = ({ loadingDisplay, contentDisplay }) => {
    loading.style.display = loadingDisplay;
    resultContainer.style.display = contentDisplay;
}

const updateUI = (data) => {    
    console.log
    model.textContent = data.model;
    agreement.textContent = data.agreement;
    confidence.textContent = data.confidence;
    irony.textContent = data.irony;
    subjectivity.textContent = data.subjectivity;
    score.textContent = data.score_tag;
    loadingDataView({loadingDisplay: 'none', contentDisplay: 'flex'})
}

const showError = (error) => {
    loadingDataView({loadingDisplay: 'none', contentDisplay: 'none'});
    errorMessage.style.display = 'flex';
    errorMessage.textContent = error;
}

button.addEventListener('click', async (event) => {
    if (event) { event.preventDefault(); }
    const { value } = input;
    errorMessage.style.display = 'none';
    if(isValidURL(value)) {
        loadingDataView({loadingDisplay: 'flex', contentDisplay: 'none'});
        try {
            const data = await doRequest('/analyze-text', 'POST', value);
            if (data.status === 200){
                return updateUI(data.content);
            }
            return showError(data.error);
        } catch(e) {
            console.log("Error", e);
        }
    } else {
        input.style.border = '2px solid red';
        input.value = '';
        input.placeholder = 'Try with another URL';
    }
})
