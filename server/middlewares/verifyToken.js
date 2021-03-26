const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('X-Access-Token');

    if(!token){
        res.status(401).json(
            {
                error: {
                    status: 401,
                    message: 'To access a resource, you must be authenticated'
                }
            }
        )
    }

    else {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
           
            req.decoded = decoded
            
            next();

        } catch (err) {
            res.status(401).json(
                {
                    error: {
                        status: 401,
                        message: 'Token is incorrect or expired',
                        expired: true
                    }
                }
            )
        }
    }
}