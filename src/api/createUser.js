export default ({ nameCompany, email, password, repeatPassword }) => {
    return fetch('http://localhost:5001/api/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nameCompany, email, password, repeatPassword })
    });
}