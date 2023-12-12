import express from 'express';
import reviewRoutes from './routes.js';
import 'dotenv/config'

const app = express();
const PORT = 3000;

app.use('/app', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
