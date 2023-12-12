import { updateReviews } from "./reviews.js";

const args = process.argv.slice(2);

if (args.length > 0) {
  updateReviews(args)
    .then(() => {
      console.log('Reviews fetched successfully');
    })
    .catch((err) => {
      console.error('Error:', err);
    });
} else {
  console.log('Please provide a name as an argument.');
}