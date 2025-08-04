# API Documentation

This document describes the REST API endpoints for the Telegram Location Review Bot backend.

## Base URL
- Development: `http://localhost:5000`
- Production: `https://tg-reviewbot-718b.vercel.app`

## Authentication

Most endpoints are currently open for development. Telegram Web App data validation is implemented for production use.

### Telegram Web App Validation
For endpoints that require Telegram authentication, include the header:
```
X-Telegram-Init-Data: <telegram_web_app_init_data>
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `400`: Bad Request (missing/invalid parameters)
- `404`: Resource not found
- `500`: Internal server error
- `503`: Database connection error

## Endpoints

### Health Check

#### GET /health
Check if the API server is running.

**Response:**
```json
{
  "status": "ok"
}
```

---

### Users

#### POST /api/users/register
Register or update a Telegram user.

**Request Body:**
```json
{
  "telegramId": "123456789",
  "nickname": "UserName",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "telegram_id": "123456789",
  "nickname": "UserName",
  "avatar_url": "https://example.com/avatar.jpg",
  "role": "user",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Locations

#### GET /api/locations
Get all approved locations.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Great Coffee Shop",
    "description": "Best coffee in town",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "category": "restaurant-bar",
    "type": "permanent",
    "working_hours": "9:00-18:00",
    "website_url": null,
    "is_approved": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "user_id": 1
  }
]
```

#### POST /api/locations
Create a new location (requires approval).

**Request Body:**
```json
{
  "name": "New Location",
  "description": "Description of the location",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "category": "grocery",
  "type": "permanent",
  "workingHours": "9:00-18:00",
  "websiteUrl": "https://example.com",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Categories:** `grocery`, `restaurant-bar`, `bike-rent`, `clothing`, `other`  
**Types:** `permanent`, `temporary`

**Response:**
```json
{
  "id": 2,
  "name": "New Location",
  "description": "Description of the location",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "category": "grocery",
  "type": "permanent",
  "is_approved": false,
  "created_at": "2024-01-01T00:00:00.000Z",
  "user_id": 1
}
```

#### GET /api/locations/:id
Get a specific location by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Great Coffee Shop",
  "description": "Best coffee in town",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "category": "restaurant-bar",
  "type": "permanent",
  "is_approved": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "user_id": 1
}
```

---

### Ratings

#### GET /api/ratings/location/:locationId
Get all ratings for a specific location.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "location_id": 1,
    "stars": 3,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/ratings/location/:locationId/average
Get average rating for a location.

**Response:**
```json
{
  "average": 2.5
}
```

#### POST /api/ratings
Create or update a rating for a location.

**Request Body:**
```json
{
  "locationId": 1,
  "stars": 3
}
```

**Note:** Stars must be between 1-3 (not 1-5). One rating per user per location.

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "location_id": 1,
  "stars": 3,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Comments

#### GET /api/comments/location/:locationId
Get all approved comments for a location.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "location_id": 1,
    "content": "Great place, highly recommend!",
    "is_approved": true,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/comments
Create a new comment for a location.

**Request Body:**
```json
{
  "locationId": 1,
  "content": "This is a great place!"
}
```

**Response:**
```json
{
  "id": 2,
  "user_id": 1,
  "location_id": 1,
  "content": "This is a great place!",
  "is_approved": true,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

## Admin Endpoints

Admin endpoints are used for content moderation. In production, these should be protected with proper authentication.

### Admin Locations

#### GET /api/admin/locations
Get all locations including pending approval.

**Response:** Same as `/api/locations` but includes unapproved locations.

#### POST /api/admin/locations/:id/approve
Approve a pending location.

**Response:**
```json
{
  "id": 1,
  "name": "Approved Location",
  "is_approved": true,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /api/admin/locations/:id
Delete a location completely.

**Response:**
```json
{
  "success": true
}
```

### Admin Comments

#### GET /api/admin/comments
Get all comments including pending approval.

**Response:** Same as location comments but includes unapproved comments.

#### POST /api/admin/comments/:id/approve
Approve a pending comment.

**Response:**
```json
{
  "id": 1,
  "content": "Approved comment",
  "is_approved": true,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /api/admin/comments/:id
Delete a comment completely.

**Response:**
```json
{
  "success": true
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(64) UNIQUE NOT NULL,
    nickname VARCHAR(64) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(16) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Locations Table
```sql
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    type VARCHAR(16) NOT NULL CHECK (type IN ('permanent', 'temporary')),
    category VARCHAR(32) NOT NULL CHECK (
        category IN ('grocery', 'restaurant-bar', 'bike-rent', 'clothing', 'other')
    ),
    working_hours TEXT,
    website_url TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table
```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Ratings Table
```sql
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, location_id)
);
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production use, consider implementing:
- Request rate limits per IP address
- User-specific rate limits for authenticated requests
- Stricter limits for resource-intensive operations

## CORS Configuration

The API is configured to accept requests from:
- `https://tg-reviewbot.vercel.app` (production)
- `http://localhost:3000` (development)

## Error Handling

The API includes comprehensive error handling:
- Database connection errors return 503 status
- Validation errors return 400 status with descriptive messages
- All errors are logged server-side for debugging
- Sensitive information is not exposed in error responses