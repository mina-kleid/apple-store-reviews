# Project Title

Short description or tagline for the backend project.

## Introduction

A brief overview of what the backend does and its main functionalities.

## Prerequisites

- Node.js (18.15.0)

### Configuration

- Environment variables setup
- Database configurations

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
npm start

# Lint
npm lint

# Refresh reviews
npm refreshReviews -- YourAppId
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
