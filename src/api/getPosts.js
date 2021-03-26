export default async () => {
    const url = 'https://simplejobdashboard.herokuapp.com/api/posts';
    const body = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await body.json();
}