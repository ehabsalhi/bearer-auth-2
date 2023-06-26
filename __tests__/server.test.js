const supertest = require('supertest')
const {app} = require('../src/server')
const { sequelize } = require('../src/moduls')
const muke = supertest(app)
require('dotenv').config()
const base64 = require("base-64")



describe('server test' , () => {
     beforeAll(async () => {
          await sequelize.sync()
     })

     afterAll(async () =>{
          await sequelize.sync()
     })

     it('signup test' , async () =>{
          const name = 'ehab_test112'
          const res = await muke.post('/signup').send({
               username: name,
               password : '123123'
          })
          // console.log(JSON.parse(res.text).message.username);

          expect(res.statusCode).toBe(201)
          expect(JSON.parse(res.text).message.username).toBe(name)

     })

    const base = base64.encode('ehab_test112:123123') 
     it('signin test' , async () =>{
          const res = await muke.post('/signin').set('Authorization', `Basic ${base}`)
          // console.log(res);

          // console.log(JSON.parse(res.text).message);
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).message).toBe('This user is Authorized!!!')

     })
})