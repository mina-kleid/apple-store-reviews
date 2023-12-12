export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  if (token !== process.env.AUTH_TOKEN) {
    return res.sendStatus(403);
  }

  next();
}