export default ({ email, password }) => {
    return fetch('http://localhost:5001/api/authenticate', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}