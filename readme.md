# Contacts API Documentation

API documentation for Contacts backend. This API allows users to perform CRUD operations on contacts and manage user authentication.

## API Base URL

The base URL for accessing the API is: `https://contacts-rest-api-siob.onrender.com`

## Authentication

This API uses JWT (JSON Web Token) for authentication. To access protected endpoints, you need to include a valid JWT token in the `Authorization` header.

## Endpoints

### Contacts

#### Get All Contacts
- **Method:** `GET`
- **URL:** `/api/contacts`
- **Description:** Returns an array of all contacts in JSON format.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
  - `page` (Query): Page number for pagination (default: 1).
  - `limit` (Query): Number of contacts per page (default: 20, maximum: 100).
  - `favorite` (Query): Filter contacts by favorite field.
- **Responses:**
  - `200 OK`: Successful operation. Returns an array of contacts.
  - `404 Not Found`: Contact not found.

#### Create a Contact
- **Method:** `POST`
- **URL:** `/api/contacts`
- **Description:** Create a new contact.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
- **Request Body:**
  - Contact information (JSON format):
    - `name` (required): Name of the contact.
    - `email` (required): Email of the contact.
    - `phone` (required): Phone number of the contact.
- **Responses:**
  - `201 Created`: Contact created successfully.
  - `400 Bad Request`: Missing required fields (`name`, `email`, `phone`).

#### Get Contact by ID
- **Method:** `GET`
- **URL:** `/api/contacts/{id}`
- **Description:** Returns contact by ID in JSON format.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
  - `id` (Path): ID of the contact to retrieve.
- **Responses:**
  - `200 OK`: Successful operation. Returns the contact.
  - `404 Not Found`: Contact not found.

#### Update Contact by ID
- **Method:** `PUT`
- **URL:** `/api/contacts/{id}`
- **Description:** Update a contact by ID.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
  - `id` (Path): ID of the contact to update.
- **Request Body:**
  - Updated contact information (JSON format).
- **Responses:**
  - `200 OK`: Contact updated successfully.
  - `400 Bad Request`: Missing fields.
  - `404 Not Found`: Contact not found.

#### Delete Contact by ID
- **Method:** `DELETE`
- **URL:** `/api/contacts/{id}`
- **Description:** Delete a contact by ID.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
  - `id` (Path): ID of the contact to delete.
- **Responses:**
  - `200 OK`: Contact deleted successfully.
  - `404 Not Found`: Contact not found.

#### Update Contact Favorite Status by ID
- **Method:** `PATCH`
- **URL:** `/api/contacts/{contactId}/favorite`
- **Description:** Update the favorite status of a contact by ID.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
  - `contactId` (Path): ID of the contact to update.
- **Request Body:**
  - Updated favorite status information (JSON format).
- **Responses:**
  - `200 OK`: Contact favorite status updated successfully.
  - `400 Bad Request`: Missing field `favorite`.
  - `404 Not Found`: Contact not found.

### Users

#### User Registration
- **Method:** `POST`
- **URL:** `/users/signup`
- **Description:** User registration.
- **Request Body:**
  - Registration request (JSON format):
    - `email` (required): User's email.
    - `password` (required): User's password.
- **Responses:**
  - `201 Created`: Successful registration.
  - `400 Bad Request`: Error details from Joi or another validation library.
  - `409 Conflict`: Email in use.

#### User Login
- **Method:** `POST`
- **URL:** `/users/login`
- **Description:** User login.
- **Request Body:**
  - Login request (JSON format):
    - `email` (required): User's email.
    - `password` (required): User's password.
- **Responses:**
  - `200 OK`: Successful login. Returns a JWT token and user details.
  - `400 Bad Request`: Error from Joi or another validation library.
  - `401 Unauthorized`: Email or password is wrong.

#### User Logout
- **Method:** `GET`
- **URL:** `/users/logout`
- **Description:** User logout.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
- **Responses:**
  - `204 No Content`: No content.
  - `401 Unauthorized`: Not authorized.

#### Get Current User Details
- **Method:** `GET`
- **URL:** `/users/current`
- **Description:** Get current user details.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
- **Responses:**
  - `200 OK`: Successful response. Returns user details.
  - `401 Unauthorized`: Not authorized.

#### Update User Avatar
- **Method:** `PATCH`
- **URL:** `/users/avatars`
- **Description:** Update user avatar.
- **Parameters:**
  - `Authorization` (Header): JWT token for authentication.
- **Request Body:**
  - User's avatar image (multipart/form-data).
- **Responses:**
  - `200 OK`: Successful operation. Returns the avatar URL.
  - `401 Unauthorized`: Not authorized.

#### Verify User by Verification Token
- **Method:** `GET`
- **URL:** `/users/verify/{verificationToken}`
- **Description:** Verify user by verification token.
- **Parameters:**
  - `verificationToken` (Path): Token used for user verification.
- **Responses:**
  - `200 OK`: Verification successful.
  - `404 Not Found`: User not found.

#### Resend Email Verification
- **Method:** `POST`
- **URL:** `/users/verify`
- **Description:** Resend email verification.
- **Request Body:**
  - Resend Verification Email Request (JSON format):
    - `email` (required): User's email.
- **Responses:**
  - `200 OK`: Verification email sent.
  - `400 Bad Request`: Verification has already been passed.
  - `401 Unauthorized`: Email not found.
