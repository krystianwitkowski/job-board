export default () => {
    const url = 'http://localhost:5001/api/posts';
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}