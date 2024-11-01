require('../../models')
const request = require('supertest')
const app = require('../../app')

let user
let TOKEN
let hotelId

const BASE_URL = '/api/v1/hotels'

let hotel
let cityId


beforeAll(async () => {
  user = await request(app)
    .post('/api/v1/users')
    .send({
        firstName: "Carlos",
        lastName: "Gimenez",
        email: "carlos@gmail.com",
        password: "carlos1234",
        gender: "male"
    })

  const credentials = {
    email: "carlos@gmail.com",
    password: "carlos1234"
  }

  const resToken = await request(app)
    .post('/api/v1/users/login')
    .send(credentials)

  TOKEN = resToken.body.token


  const city = await request(app)
    .post('/api/v1/cities')
    .send({
      name: "Cordoba",
      country: "Argentina",
      countryId: "AR"
    })
    .set('Authorization', `Bearer ${TOKEN}`)

  cityId = city.body.id

  hotel = {
    name: "Quinto Centenario Hotel",
    description: "The Quinto Centenario Hotel is located in Córdoba. It has a seasonal outdoor pool, free Wi-Fi in common areas and sauna, as well as a gym.",
    price: "124",
    address: "Duarte Quirós 1300, Córdoba",
    lat: "-31.4129",
    lon: "-64.2026",
    raiting: "4.6",
    cityId
  }

})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${user.body.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  await request(app)
    .delete(`/api/v1/cities/${cityId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(hotel)
    .set('Authorization', `Bearer ${TOKEN}`)

  hotelId = res.body.id

   expect(res.status).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(hotel.name)
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
   expect(res.body[0].name).toBe(hotel.name)
})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${hotelId}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(hotel.name)
})

test("UPDATE -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

  const hotelUpdate = {
    name: 'Holiday Inn Cordoba'
  }

  const res = await request(app)
    .put(`${BASE_URL}/${hotelId}`)
    .send(hotelUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(hotelUpdate.name)
})


test("REMOVE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${hotelId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})

