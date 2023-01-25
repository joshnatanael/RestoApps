## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `POST /login/google`
- `POST /food`
- `GET /food`
- `GET /food/:id`
- `DELETE /food/:id`
- `GET /categories`
- `POST /categories`
- `GET /users`
- `DELETE /categories/:id`
- `PUT /food/:id`
- `PATCH /food/:id/:status`
- `GET /histories`
- `GET /categories/:id`
- `PUT /categories/:id`

### POST /register
#### Description
- Create a new account

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
      "201": {
        "id": "Integer",
        "email": "String"
     }
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

### POST /login
#### Description
- Login account using email and password

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
      "200": {
        "access_token": "String"
     }
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
### POST /login/google
#### Description
- Login account using google account

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

### POST /food
#### Description
- Create a new food data

#### Request
- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```
- Body
    ```json
    {
      "name": String | required,
      "description": String | required,
      "price": Integer | required | Higher than 10000,
      "imgUrl": String | required,
      "authorId": Integer,
      "categoryId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "addedFood": {
        "id": 10,
        "name": "Garlic Beef Katsu",
        "description": "Garlic beef katsu with rice",
        "price": 105000,
        "imgUrl": "https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/1f501ffb-e797-4077-9286-342bb1087b20_Go-Biz_20220309_194451.jpeg",
        "authorId": 3,
        "categoryId": 1,
        "updatedAt": "2022-11-14T14:45:15.226Z",
        "createdAt": "2022-11-14T14:45:15.226Z"
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "errors": [
        "Food name is required",
        "Description is required",
        "Price must be higher than 10.000",
        "Image Url is required"
      ]
    }
    ```
### GET /food
#### Description
- Get all the food data

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
        "name": "Beef Katsu",
        "description": "Beef katsu with rice",
        "price": 82000,
        "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/d3323a33-f816-4dd1-a67b-5dd6f2b2ae1c.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt": "2022-11-15T04:21:29.356Z",
        "updatedAt": "2022-11-15T04:21:29.356Z",
        "User": {
            "email": "psillito0@dailymotion.com"
        }
      },
      ...
    ]
    ```
### GET /food/:id
#### Description
- Get the food details

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
      "foodDetail": {
        "id": 1,
        "name": "Beef Katsu",
        "description": "Beef katsu with rice",
        "price": 82000,
        "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/d3323a33-f816-4dd1-a67b-5dd6f2b2ae1c.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt": "2022-11-15T04:21:29.356Z",
        "updatedAt": "2022-11-15T04:21:29.356Z",
        "User": {
            "email": "psillito0@dailymotion.com",
            "role": "Admin",
            "phoneNumber": "+54 944 902 1215"
        },
        "Category": {
            "id": 1,
            "name": "Beef",
            "createdAt": "2022-11-15T04:21:29.354Z",
            "updatedAt": "2022-11-15T04:21:29.354Z"
        }
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

### DELETE /food/:id
#### Description
- Remove a food data based on given id

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
      "deletedFood": {
        "id": 10,
        "name": "Garlic Beef Katsu",
        "description": "Garlic beef katsu with rice",
        "price": 105000,
        "imgUrl": "https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/1f501ffb-e797-4077-9286-342bb1087b20_Go-Biz_20220309_194451.jpeg",
        "authorId": 3,
        "categoryId": 1,
        "createdAt": "2022-11-14T14:45:15.226Z",
        "updatedAt": "2022-11-14T14:45:15.226Z"
      }
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "You have no access!"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### GET /categories
#### Description
- Get all the categories data

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
        "name": "Beef",
        "createdAt": "2022-11-14T12:48:10.972Z",
        "updatedAt": "2022-11-14T12:48:10.972Z"
      },
      ...
    ]
    ```

### POST /categories
#### Description
- Create a new category

#### Request
- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```
- Body
    ```json
    {
      "name": String | required
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": 8,
      "name": "newCategory",
      "updatedAt": "2022-11-16T13:13:10.011Z",
      "createdAt": "2022-11-16T13:13:10.011Z"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
     "message": [
        "Category name is required"
      ]
    }
    ```
### GET /users
#### Description
- Get user detail

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
### DELETE /categories/:id
#### Description
- Remove a category data based on given id

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
      "id": 8,
      "name": "deletedCategory",
      "createdAt": "2022-11-16T13:13:10.011Z",
      "updatedAt": "2022-11-16T13:13:10.011Z"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### PUT /food/:id
#### Description
- Edit food data by id

#### Request
- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```
- Body
    ```json
    {
      "name": String | required,
      "description": String | required,
      "price": Integer | required | Higher than 10000,
      "imgUrl": String | required,
      "authorId": Integer,
      "categoryId": Integer
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "editedFood": {
        "name": "Oyakodon Katsu",
        "description": "Katsu served with egg and rice",
        "price": 89000,
        "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/a9959ffe-1190-47ca-8b1d-369ddd16cb8d.jpg",
        "categoryId": 3
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "errors": [
        "Food name is required",
        "Description is required",
        "Price must be higher than 10.000",
        "Image Url is required"
      ]
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "You have no access!"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### PATCH /food/:id/:status
#### Description
- Edit food status by id

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
      "updatedFood": {
        "id": 5,
        "name": "Oyakodon Katsu",
        "description": "Katsu served with egg and rice",
        "price": 89000,
        "imgUrl": "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/a9959ffe-1190-47ca-8b1d-369ddd16cb8d.jpg",
        "authorId": 3,
        "categoryId": 3,
        "status": "Inactive",
        "createdAt": "2022-11-21T08:05:44.793Z",
        "updatedAt": "2022-11-21T10:06:05.349Z"
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Invalid Status"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "You have no access!"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
    }
    ```
### GET /histories
#### Description
- Get all the history data

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
        "id": 22,
        "name": "Oyakodon Katsu",
        "description": "Food status with id 5 has been updated from Active into Inactive",
        "updatedBy": "user1@mail.com",
        "createdAt": "2022-11-21T10:21:12.561Z",
        "updatedAt": "2022-11-21T10:21:12.561Z"
      },
      ...
    ]
    ```
### GET /categories/:id
#### Description
- Get the category details

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
      "categoryDetail": {
        "id": 5,
        "name": "Cheese",
        "createdAt": "2022-11-22T09:28:35.790Z",
        "updatedAt": "2022-11-22T09:29:18.053Z"
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
### PUT /categories/:id
#### Description
- Edit category name by id

#### Request
- headers: 

    ```json
    {
      "access_token": "string"
    }
    ```
- Body
    ```json
    {
      "name": String | required
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "editedFood": {
        "name": "Cheese"
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "errors": [
        "Category name is required"
      ]
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error not found"
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