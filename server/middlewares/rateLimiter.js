const { RateLimiterMemory } = require('rate-limiter-flexible');

const opts = {
    points: 6, // 5 points
    duration: 60 * 15 // Per second // Set 15 minutes
  };
  
const rateLimiter = new RateLimiterMemory(opts);

module.exports = async (req, res, next) => {
    return rateLimiter.consume(req.connection.remoteAddress)
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      res.status(429).json({ error: {
          status: 429,
          message: 'Too many requests',
          data: ['', 'Too many requests. Please wait 15 minutes']
      }});
    });
}
