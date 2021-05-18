export default ({ city }) => {
    const url = `${'http://localhost:5001/api/posts?city=' + city }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}