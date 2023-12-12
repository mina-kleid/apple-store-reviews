export function authenticateToken(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.sendStatus(401);
  }

  if (apiKey !== process.env.API_KEY) {
    return res.sendStatus(403);
  }

  next();
}