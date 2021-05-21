export default ({ city }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?city=' + city }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}