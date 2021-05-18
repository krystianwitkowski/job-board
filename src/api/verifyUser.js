export default (verify) => {
    return fetch('http://localhost:5001/api/verify', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ verify })
    });
}