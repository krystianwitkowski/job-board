export default async ({ nameCompany, email, password, repeatPassword }) => {
    const body = await fetch('https://simplejobdashboard.herokuapp.com/api/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nameCompany, email, password, repeatPassword })
    });

    return await body.json();
}