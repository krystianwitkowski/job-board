export default async (form) => {
    const body = await fetch('http://localhost:5001/api/apply', {
        headers: {
            'X-Access-Token': JSON.parse(localStorage.getItem('tokens')).accessToken,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(form)
    });

    return await body.json();
}