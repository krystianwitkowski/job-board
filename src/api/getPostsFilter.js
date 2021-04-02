export default ({ filter }) => {
    const url = `${'http://localhost:5001/api/posts?filter=' + filter }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}