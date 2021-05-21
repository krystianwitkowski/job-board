export default ({ filter }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?filter=' + filter }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}