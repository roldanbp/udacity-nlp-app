

const doRequest = async (url, method, value) => {
    try {
        const result = await fetch(url, {
            method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({value})
        });
        const parsedResult = await result.json();
        return parsedResult;
    } catch(error) {
        console.log("Error", error)
        return { error };
    }
}

module.exports = {
    doRequest,
}