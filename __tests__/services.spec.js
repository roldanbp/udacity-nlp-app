require('jest-fetch-mock').enableMocks()
const { doRequest } = require('../src/client/js/services/services');
const mockData = require('../mocks/services.data');

beforeEach(() => {
    fetch.resetMocks();
})

describe('Services request', () => {
    
    it('Should return data when it is succesful', async () => {
        const expected = {
            model: "general_en",
            score_tag: "P",
            agreement: "DISAGREEMENT",
            subjectivity: "SUBJECTIVE",
            confidence: "86",
            irony: "NONIRONIC",
        }
        fetch.mockResponseOnce(JSON.stringify({...mockData}));
        const result = await doRequest('url', 'POST', 'hayo');
        expect(result).toEqual(expected);
        expect(fetch).toHaveBeenCalledTimes(1);
    })
    
    it('Should return error message when it fail', async () => {
        fetch.mockReject({error: 'Something wrong happened, try later...'});
        const result = await doRequest('url', 'POST', 'hayo');
        expect(result.error).toEqual({error: 'Something wrong happened, try later...'});
    })
})