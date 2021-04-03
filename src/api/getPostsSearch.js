export default ({ search }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?search=' + search }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}