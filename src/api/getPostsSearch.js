export default ({ search }) => {
    const url = `${'http://localhost:5001/api/posts?search=' + search }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}