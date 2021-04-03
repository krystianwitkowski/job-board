export default ({ nameCompany, email, password, repeatPassword }) => {
    return fetch('https://simplejobdashboard.herokuapp.com/api/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nameCompany, email, password, repeatPassword })
    });
}