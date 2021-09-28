const { isValidURL } = require('../src/client/js/util/util')
describe('Util', () =>{
    it('Should return false if the URL is incorrect', () => {
        const url = "wrong url";
        expect(isValidURL(url)).toBeFalsy();
    })
    
    it('Should return true if the URL is correct', () => {
        const url = "www.test.com";
        expect(isValidURL(url)).toBeTruthy();
    })
})