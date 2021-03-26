export default async ({ search }) => {
    const url = `${'https://simplejobdashboard.herokuapp.com/api/posts?search=' + search }`;
    const body = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await body.json();
}