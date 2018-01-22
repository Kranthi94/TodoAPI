var expect = require('expect');

var supertest = require('supertest');

var {app} = require('../server.js');

var {TodoModel} = require('../models/todo.js');

beforeEach((done) => {
    TodoModel.remove({}).then(() => {
      done();
    });
});

describe('POST /todos', () => {

    it('Should insert item into the database and return response', (done) => {

      var text = 'Inserting item into database for testing';

      var completed = false;

      supertest(app)
        .post('/todos')
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

            TodoModel.find().then((todos) => {
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