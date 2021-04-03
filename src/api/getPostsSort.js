export default ({ currency, workplace }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?currency=' + currency + '&workplace=' + workplace }`;
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}