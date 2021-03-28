export default (verify) => {
    return fetch('https://simplejobdashboard.herokuapp.com/api/verify', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ verify })
    });
}