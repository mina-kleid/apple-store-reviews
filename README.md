# Project Title

A backend built on NodeJs for fetching Apple store reviews RSS feed

## Introduction

- The backend fetches reviews for a specified `AppId` from the Itunes RSS feed for customer reviews
- Reviews are persisted locally in a JSON file in `db/` with `AppId-reviews.json`
- Exposing two endpoints
  1. Refresh the persisted reviews
  2. Get the persisted reviews

## Prerequisites

- Node.js (18.15.0)

## Installation

Instructions to set up the project locally:

```bash
# Clone the repository
git clone git@github.com:mina-kleid/apple-store-reviews.git

# Navigate to the project directory
cd apple-store-reviews

# Install dependencies
npm install
```

## Usage

```bash

# Start the server
npm run start

# Lint
npm run lint

# Refresh reviews
npm run refreshReviews -- YourAppId
```

## Testing

Instructions for running tests:

```bash
# Run tests
npm run test
```

## API Documentation

### Authentication

- **Required Headers:** `x-api-key`
- **Description:** These endpoints require authentication via an API key provided in the `x-api-key` header. If the API key is missing or invalid, the request will be denied with a 401 Unauthorized response.

### Endpoints

#### Get Reviews

- **Method:** GET
- **URL:** `/app/:appId/reviews`
- **Description:** Retrieves reviews for a specific app.
- **Parameters:**
  - `appId`: ID of the app
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of reviews per page (default: 10)
  - `sinceHours`: How far to look back in the reviews in Hours (default: 48)
- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
    ```json
    {
      "reviews": [
        {
          "author": "Author name",
          "updated": "2023-12-08T13:16:48-07:00",
          "rating": 4,
          "content": "Ever since I downloaded the app."
        },
        {
          "author": "Author name",
          "updated": "2023-12-08T13:16:48-07:00",
          "rating": 6,
          "content": "Love the app."
        },
        ...
      ],
      "pagination": {
        "totalItems": 100,
        "itemsPerPage": 10,
        "currentPage": 1,
        "totalPages": 10
      }
    }
    ```
- **Error Responses:**
  - **Status Code:** 500 Internal Server Error
  - **Response Body:** `{ "error": "Unable to fetch reviews" }`

#### Refresh Reviews

- **Method:** GET
- **URL:** `/app/:appId/reviews/refresh`
- **Description:** Manually triggers a refresh of reviews for a specific app.
- **Parameters:**
  - `appId`: ID of the app
- **Response:**
  - **Status Code:** 200 OK
- **Error Responses:**
  - **Status Code:** 500 Internal Server Error
  - **Response Body:** `{ "error": "Unable to refresh reviews" }`
