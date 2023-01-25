## Endpoints

List of Available Endpoints:
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/login/google`
- `GET /customers/food`
- `GET /customers/food/:id`
- `GET /customers/categories`
- `GET /customers/favourites`
- `POST /customers/favourites/:id`
- `DELETE /customers/favourites/:id`
- `GET /customers/users`

### POST /customers/register
#### Description
- Create a new account for customer

#### Request
- Body
    ```json
    {
      "username": String,
      "email": String | required,
      "password": Integer | required | Longer than 5 characters,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": "Integer",
      "email": "String"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
     "message": [
        "Email is required",
        "email must be unique",
        "Please insert valid email address",
        "Password is required",
        "Password must be 5 characters or longer"
      ]
    }
    ```

### POST /customers/login
#### Description
- Login to customer account using email and password

#### Request
- Body
    ```json
    {
      "email": String | required,
      "password": Integer | required
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": "String"
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
     "message": "Email or password cannot be empty"
    }
    ```

_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Error invalid username or email or password"
    }
    ```
### POST /customers/login/google
#### Description
- Login to customer account using google account

#### Request
- Headers
    ```json
    {
      "google_token": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": `User X found`,
      "access_token": "String",
      "user": {
        "name": "String"
      }
    }
    ```

### GET /customers/food
#### Description
- Get all the filtered food data each page

#### Request

- query: 

    ```json
    {
      "filterBy": "string",
      "categoryId": "integer",
      "page": "integer"
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
      "food": [
        {
          "id": 2,
          "name": "Chicken Katsu",
          "description": "Chicken katsu with rice",
          "price": 75000,
          "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/87a632b1-5942-491e-ae21-b128d6d0dc58.jpg",
          "authorId": 2,
          "categoryId": 2,
          "status": "Active",
          "createdAt": "2022-11-21T08:05:44.793Z",
          "updatedAt": "2022-11-23T14:33:26.555Z",
          "User": {
              "email": "ifrankes1@tamu.edu"
          }
        },
        ...
      ],
      "totalFood": 18
    }
    ```
### GET /customers/food/:id
#### Description
- Get the food details

#### Response
_200 - OK_

- Body
    ```json
    {
      "id": 4,
      "name": "Salmon Roll Sushi",
      "description": "Sushi with salmon roll package",
      "price": 60000,
      "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/598bb3b8-e7b3-4351-8bf8-bbf91440d5c7.jpg",
      "authorId": 4,
      "categoryId": 4,
      "status": "Active",
      "createdAt": "2022-11-21T08:05:44.793Z",
      "updatedAt": "2022-11-23T15:43:47.176Z",
      "User": {
          "email": "pwort3@cnet.com",
          "role": "Admin",
          "phoneNumber": "+1 716 310 7657"
      },
      "Category": {
          "id": 4,
          "name": "Sushi",
          "createdAt": "2022-11-21T08:05:44.791Z",
          "updatedAt": "2022-11-21T08:05:44.791Z"
      }
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### GET /customers/categories
#### Description
- Get all categories data each page

#### Response
_200 - OK_

- Body
    ```json
    [
      {
        "id": 2,
        "name": "Chicken",
        "createdAt": "2022-11-21T08:05:44.791Z",
        "updatedAt": "2022-11-21T08:05:44.791Z"
      },
      ...
    ]
    ```

### GET /customers/favourites
#### Description
- Get all customer's favourite food

#### Request

- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    [
      {
        "id": 1,
        "UserId": 16,
        "FoodId": 4,
        "createdAt": "2022-11-30T10:12:38.185Z",
        "updatedAt": "2022-11-30T10:12:38.185Z",
        "User": {
            "email": "customer1@mail.com",
            "role": "Customer",
            "phoneNumber": null
        },
        "Food": {
            "id": 4,
            "name": "Salmon Roll Sushi",
            "description": "Sushi with salmon roll package",
            "price": 60000,
            "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/598bb3b8-e7b3-4351-8bf8-bbf91440d5c7.jpg",
            "authorId": 4,
            "categoryId": 4,
            "status": "Active",
            "createdAt": "2022-11-21T08:05:44.793Z",
            "updatedAt": "2022-11-23T15:43:47.176Z"
        }
      },
      ...
    ]
    ```
### POST /customers/favourites/:id
#### Description
- Add food to user's favourites

#### Request
- headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "id": 5,
      "UserId": 16,
      "FoodId": 5,
      "updatedAt": "2022-11-30T10:30:47.032Z",
      "createdAt": "2022-11-30T10:30:47.032Z"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```

### POST /customers/favourites/:id
#### Description
- Add food to user's favourites

#### Request
- headers
    ```json
    {
      "access_token": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "Successfully remove food from favourites"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```

### GET /customers/users
#### Description
- Get customer detail

#### Request
- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
     "user": "user1",
     "role": "Staff"
    }
    OR
    {
      "user": "user1@mail.com",
      "role": "Staff"
    }
    ```


### Global Error
_Response (401 - Unauthorized)_

  ```json
  {
    "message": {
        "name": "invalid token"
    }
  }
  ```

_Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal server error"
  }
  ```