export default ({ email, password }) => {
    return fetch('https://simplejobdashboard.herokuapp.com/api/authenticate', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}