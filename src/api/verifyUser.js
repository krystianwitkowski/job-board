export default async (verify) => {
    const body = await fetch('https://simplejobdashboard.herokuapp.com/api/verify', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ verify })
    });
    
    return await body.json();
}