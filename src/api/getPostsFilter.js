export default async ({ filter }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?filter=' + filter }`;
    const body = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await body.json();
}