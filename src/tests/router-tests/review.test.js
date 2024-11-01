require('../../models')
const request = require('supertest')
const app = require('../../app')

let user
let TOKEN
let hotel
let hotelId
let review
let reviewId

const BASE_URL = '/api/v1/reviews'

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


  hotel = await request(app)
    .post('/api/v1/hotels')
    .send({
        name: "Quinto Centenario Hotel",
        description: "The Quinto Centenario Hotel is located in Córdoba. It has a seasonal outdoor pool, free Wi-Fi in common areas and sauna, as well as a gym.",
        price: "124",
        address: "Duarte Quirós 1300, Córdoba",
        lat: "-31.4129",
        lon: "-64.2026",
        raiting: "4.6"
    })
    .set('Authorization', `Bearer ${TOKEN}`)

  hotelId = hotel.body.id

  review = {
    hotelId: hotel.body.id,
    rating: 5,
    comment: "Highly recommended, the attention from the staff was excellent, the room was very clean and well decorated. I didn't take advantage of breakfast this time but I know it was very good. The friendliness of the receptionists and all the staff is great.|The gym is very complete and modern.",
  }

})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${user.body.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  await request(app)
    .delete(`/api/v1/hotels/${hotelId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(review)
    .set('Authorization', `Bearer ${TOKEN}`)

  reviewId = res.body.id

   expect(res.status).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.comment).toBe(review.comment)
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
   expect(res.body[0].comment).toBe(review.comment)
})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.comment).toBe(review.comment)
})

test("UPDATE -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

  const reviewUpdate = {
    comment: "BAD HOTEL"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${reviewId}`)
    .send(reviewUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.comment).toBe(reviewUpdate.comment)
})


test("REMOVE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})

