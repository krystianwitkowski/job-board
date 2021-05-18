export default ({ currency, workplace }) => {
    const url = `${'http://localhost:5001/api/posts?currency=' + currency + '&workplace=' + workplace }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}