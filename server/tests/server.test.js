const expect = require('expect');

const supertest = require('supertest');

const {app} = require('../server.js');

const {TodoModel} = require('../models/todo.js');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');

beforeEach(populateUsers);

beforeEach(populateTodos);

describe('POST /todos', () => {

    it('Should insert item into the database and return response', (done) => {

      var text = 'Inserting item into database for testing';

      var completed = false;

      supertest(app)
        .post('/todos')
        .set('x-auth', users[0].token[0].token)
        .send({
          text,
          completed
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
          expect(res.body.completed).toBe(completed);
        })
        .end((err, res) => {

            if(err){
              return done(err);
            }

            TodoModel.find({text}).then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              expect(todos[0].completed).toBe(completed);
              done();
            }).catch((err) => {
              done(err);
            });
        });
    });

    it('Should not create todo with invalid body', (done) => {

        supertest(app)
          .post('/todos')
          .set('x-auth', users[0].token[0].token)
          .send({
            text : 'Inserting only text for the insertion to fail'
          })
          .expect(200)
          .expect((res) =>{
            expect(res.body).toInclude({
              text : 'Inserting only text for the insertion to fail'
            });
          })
          .end(done);
    })
});

describe('GET /todos', () => {

    it('Should get all the todos from the database', (done) => {

        supertest(app)
          .get('/todos')
          .set('x-auth', users[0].token[0].token)
          .expect(200)
          .expect((res) => {
              expect(res.body.todos.length).toBe(1);
          })
          .end(done);
    });
});
