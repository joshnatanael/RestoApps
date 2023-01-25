const request = require('supertest');
const app = require('../app');
const { hashPassword } = require('../helpers/bcrypt');
const {sequelize} = require('../models');
let access_token;

beforeAll(async()=>{
  await sequelize.queryInterface.bulkInsert('Users', [
    {
      email: "customer1@mail.com",
      password: hashPassword("customer1"),
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  await sequelize.queryInterface.bulkInsert('Categories', [
    {
      name: "Beef",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  await sequelize.queryInterface.bulkInsert('Food', [
    {
      name: "Beef Katsu",
      description: "Beef katsu with rice",
      price: 82000,
      imgUrl: "https://api.vold.io/pictures/5b725cca7b501d1a79414a04/images/d3323a33-f816-4dd1-a67b-5dd6f2b2ae1c.jpg",
      authorId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  const response = await request(app)
    .post('/customers/login')
    .send(
      {
        email: "customer1@mail.com",
        password: "customer1"
      }
    )
  access_token = response.body.access_token;
})

afterAll(async ()=>{
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
  await sequelize.queryInterface.bulkDelete("Food", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
  await sequelize.queryInterface.bulkDelete("Histories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
  await sequelize.queryInterface.bulkDelete("Favourites", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
})

describe('Register Account /customers/register', ()=>{
  test("Successfully register account", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "customer2@mail.com",
        password: "customer2"
      })
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
  })
  test("No email given", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        password: "customer3"
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Email is required");
  })
  test("No password given", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "customer3@mail.com"
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Password is required");
  })
  test("Empty email given", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "",
        password: "customer3"
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Email is required");
  })
  test("Empty password given", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "customer3@mail.com",
        password: ""
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Password is required");
  })
  test("Non unique email address given", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "customer1@mail.com",
        password: "customer1"
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("email must be unique");
  })
  test("Wrong email format", async ()=>{
    const response = await request(app)
      .post('/customers/register')
      .send({
        email: "customer3mail.com",
        password: "customer3"
      })
    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe("Please insert valid email address");
  })
})

describe('Login Account /customers/login', ()=>{
  test("Successfully logged in", async()=>{
    const response = await request(app)
      .post('/customers/login')
      .send({
        email: "customer1@mail.com",
        password: "customer1"
      })
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  })
  test("Wrong password given", async()=>{
    const response = await request(app)
      .post('/customers/login')
      .send({
        email: "customer1@mail.com",
        password: "customer"
      })
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Error invalid username or email or password");
  })
  test("Not registered email given", async()=>{
    const response = await request(app)
      .post('/customers/login')
      .send({
        email: "customer30@mail.com",
        password: "customer3"
      })
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Error invalid username or email or password");
  })
})

describe('Fetch food /customers/food', ()=>{
  beforeAll(()=>{
    sequelize.queryInterface.bulkInsert('Food', require('./dataFood.json').map(el=>{
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
  })
  test("Successfully fetch food data without any options", async()=>{
    const response = await request(app).get('/customers/food');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("food");
    expect(response.body.food).toBeInstanceOf(Array);
    expect(response.body.food[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("description", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("authorId");
    expect(response.body.food[0]).toHaveProperty("categoryId");
    expect(response.body.food[0]).toHaveProperty("status");
    expect(response.body.food[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("User");
    expect(response.body.food[0].User).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("totalFood", expect.any(Number));
  })
  test("Successfully fetch food data with filter options ?filterBy=chicken", async()=>{
    const response = await request(app).get('/customers/food?filterBy=chicken');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("food");
    expect(response.body.food).toBeInstanceOf(Array);
    expect(response.body.food[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("description", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("authorId");
    expect(response.body.food[0]).toHaveProperty("categoryId");
    expect(response.body.food[0]).toHaveProperty("status");
    expect(response.body.food[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("User");
    expect(response.body.food[0].User).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("totalFood", expect.any(Number));
  })
  test("Successfully fetch food data on some page ?page=1", async()=>{
    const response = await request(app).get('/customers/food?page=1');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("food");
    expect(response.body.food).toBeInstanceOf(Array);
    expect(response.body.food[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("description", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body.food[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("authorId");
    expect(response.body.food[0]).toHaveProperty("categoryId");
    expect(response.body.food[0]).toHaveProperty("status");
    expect(response.body.food[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body.food[0]).toHaveProperty("User");
    expect(response.body.food[0].User).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("totalFood", expect.any(Number));
  })
  test("Successfully fetch food detail by id", async()=>{
    const response = await request(app)
      .get('/customers/food/1')
      .set({
        access_token
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("authorId");
    expect(response.body).toHaveProperty("categoryId");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("User");
    expect(response.body.User).toHaveProperty("email", expect.any(String));
    expect(response.body.User).toHaveProperty("role", expect.any(String));
    expect(response.body.User).toHaveProperty("phoneNumber");
    expect(response.body).toHaveProperty("Category");
    expect(response.body.Category).toHaveProperty("id", expect.any(Number));
    expect(response.body.Category).toHaveProperty("name", expect.any(String));
    expect(response.body.Category).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.Category).toHaveProperty("updatedAt", expect.any(String));
  })
  test("Fetch food detail by undefined id", async()=>{
    const response = await request(app)
      .get('/customers/food/100')
      .set({
        access_token
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Error not found");
  })
})

describe('Customer Favourite /favourites', ()=>{
  test("Successfully fetch customer's favourite data", async()=>{
    await request(app)
      .post('/customers/favourites/1')
      .set({
        access_token
      })
    const response = await request(app)
      .get('/customers/favourites')
      .set({
        access_token
      })
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("FoodId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("User");
    expect(response.body[0].User).toHaveProperty("email", expect.any(String));
    expect(response.body[0].User).toHaveProperty("role", expect.any(String));
    expect(response.body[0].User).toHaveProperty("phoneNumber");
    expect(response.body[0]).toHaveProperty("Food");
    expect(response.body[0].Food).toHaveProperty("id", expect.any(Number));
    expect(response.body[0].Food).toHaveProperty("name", expect.any(String));
    expect(response.body[0].Food).toHaveProperty("description", expect.any(String));
    expect(response.body[0].Food).toHaveProperty("price", expect.any(Number));
    expect(response.body[0].Food).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0].Food).toHaveProperty("authorId");
    expect(response.body[0].Food).toHaveProperty("categoryId");
    expect(response.body[0].Food).toHaveProperty("status");
    expect(response.body[0].Food).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0].Food).toHaveProperty("updatedAt", expect.any(String));
  })
  test("Successfully add food to customer's favourite", async()=>{
    const response = await request(app)
      .post('/customers/favourites/2')
      .set({
        access_token
      })
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty("FoodId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  })
  test("Add non exist food id to customer's favourite", async()=>{
    const response = await request(app)
      .post('/customers/favourites/100')
      .set({
        access_token
      })
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Error not found");
  })
  test("Add food to customer's favourite before login (no access token available)", async()=>{
    const response = await request(app)
      .post('/customers/favourites/100')
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toHaveProperty("name", "invalid token");
  })
  test("Add food to customer's favourite using employee account", async()=>{
    await request(app)
      .post('/register')
      .send({
        email: "admin1@mail.com",
        password: "admin1"
      })
    const employeeAccount = await request(app)
      .post('/login')
      .send({
        email: "admin1@mail.com",
        password: "admin1"
      })
    const response = await request(app)
      .post('/customers/favourites/100')
      .set({
        access_token: employeeAccount.body[200].access_token
      })
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toHaveProperty("name", "invalid token");
  })
})