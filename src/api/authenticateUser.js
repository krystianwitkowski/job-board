export default async ({ email, password }) => {
    const body = await fetch('https://simplejobdashboard.herokuapp.com/api/authenticate', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    return await body.json();
}