# Gateway API Documentation
## Endpoints

## POST /api/register

To register a user , send a POST request to `/api/register` with with the email, password and username.

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "user1"
}
```

### Error Handling

- If there is an error while updating register the user, the API responds with a status code of `500` and an error message.



## GET /api/quests

To retrieve quests, make a GET request to the `/api/quests` endpoint.

```
GET /api/quests
```

### Error Handling

- If there is an error while retrieving quests, the API will respond with a status code of `500` and an error message.

### Example

```http
GET /api/quests
Content-Type: application/json

{
  {
    "id": 1,
    "username": "user1",
    "role": "admin",
    "quests": ["quest1", "quest2"]
  },
}
```

#### Response

- **Success**: `Gateway Service: POST /quests -> Quest erfolgreich gesendet`
- **Failure**: `Gateway Service: POST /quests -> Fehler beim Senden der Quest`


## POST /api/quests

To create a new quest, send a POST request to `/api/quests` with the quest details in the request body.

```http
POST /api/quests
Content-Type: application/json

{
  {
    "id": 1,
    "username": "user1",
    "role": "admin",
    "quests": ["quest1", "quest2"]
  },
}
```

### Error Handling

- If there is an error while creating the quest, the API will respond with a status code of `500` and an error message.

#### Response

- **Success**:
  - **Status Code**: `200 OK`
  - **Response Body**: JSON object representing the retrieved quest.
- **Failure**:
  - **Status Code**:
    - `404 Not Found` - Quest with the specified ID not found.
    - `500 Internal Server Error` - Error occurred while retrieving the quest.

## GET /api/quests/:id

To retrieve a specific quest by its ID, send a GET request to `/api/quests/:id`, where `:id` is the ID of the quest.

```http
GET /api/quests/123
```

### Error Handling

- If the specified quest ID is not found, the API responds with a status code of `404` and an error message.
- If an error occurs while retrieving the quest, the API responds with a status code of `500` and an error message.

#### Example

```http
POST /api/quests/123
Content-Type: application/json

{
    "id": 1,
    "username": "user1",
    "role": "admin",
    "quests": ["quest1", "quest2"]
  }
```

#### Response

- **Success**: `Gateway Service: POST /quests/:id -> Quest erfolgreich gesendet`
- **Failure**: `Gateway Service: POST /quests/:id -> Fehler beim Senden`

## POST /api/quests/:id

To update a specific quest by its ID, send a POST request to `/api/quests/:id` with the updated quest details in the request body.

```http
POST /api/quests/123
Content-Type: application/json

{
    "id": 1,
    "username": "user1",
    "role": "admin",
    "quests": ["quest1", "quest2"]
  }
```

#### Response

- **Success**:
  - **Status Code**: `200 OK`
  - **Response Body**: JSON array containing user objects.
- **Failure**:
  - **Status Code**: `500 Internal Server Error`
  - **Response Body**: Error message indicating the failure.

## GET /api/user

To retrieve user information, send a GET request to `/api/user`.

```http
GET /api/user
```

#### Example

```http
GET /api/user
Content-Type: application/json
{
  {
    "id": "1",
    "username": "user1",
    "role": "admin",
    "quests": []
  },
}
```

#### Response

- **Success**: `User erfolgreich an den Microservice gesendet`
- **Failure**: `Fehler beim Senden des Users an den Microservice`

## POST /api/user

To create a new user, send a POST request to `/api/user` with the user details in the request body.

```http
POST /api/user
Content-Type: application/json

{
    "id": "1",
    "username": "user1",
    "role": "admin",
    "quests": []
  }
```

#### Response

- **Success**:
  - **Status Code**: `200 OK`
  - **Response Body**: JSON object representing the retrieved user.
- **Failure**:
  - **Status Code**: `404 Not Found` or `500 Internal Server Error`
  - **Response Body**: Error message indicating the failure.

## GET /api/user/:id

To retrieve a specific user by their ID, send a GET request to `/api/user/:id`, where `:id` is the ID of the user.

```http
GET /api/user/123
```

### Error Handling

- If the user with the specified ID is not found, the API responds with a status code of `404` and an error message.
- If there is an error while retrieving the user, the API responds with a status code of `500` and an error message.

#### Example

```http
GET /api/user/123
Content-Type: application/json

{
    "id": 1,
    "username": "user1",
    "role": "admin",
    "quests": []
  }
```

#### Response

- **Success**: `Gateway Service: POST /user/:id -> User erfolgreich gesendet`
- **Failure**: `Gateway Service: POST /user/:id -> Fehler beim Senden des Users`

## POST /api/user/:id

To update a specific user by their ID, send a POST request to `/api/user/:id` with the updated user details in the request body.

```http
POST /api/user/123
Content-Type: application/json

{
    "id": "1",
    "username": "user1",
    "role": "admin",
    "quests": []
  }
```

### Error Handling

- If there is an error while updating the user, the API responds with a status code of `500` and an error message.