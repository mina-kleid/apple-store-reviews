import fs from 'fs/promises';
import { FILE_NAME, FILE_PATH } from '../configuration.js';

export async function getReviews(req, res) {
  const { appId } = req.params;
  const fileName = `${FILE_PATH}/${appId}-${FILE_NAME}`;

  try {
    const fileContent = await fs.readFile(fileName, 'utf8');
    const reviews = JSON.parse(fileContent);

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
}