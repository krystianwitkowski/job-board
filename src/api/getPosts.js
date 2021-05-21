export default () => {
    const url = 'https://simplejobdashboard.herokuapp.com/api/posts';
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}