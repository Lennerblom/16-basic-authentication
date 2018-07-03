'use strict';

const superagent = require('superagent');
const mongoose = require('mongoose');
const app = require('../../src/app.js');

jest.mock('../../src/auth/model.js');

describe('Authentication Server', () => {

  const PORT = 3016;
  beforeAll( () => {
    //mongoose.connect('mongodb://localhost:27017/baseball');
    app.start(PORT);
  });
  afterAll( () => {
    app.stop();
    //mongoose.connection.close();
  });

  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:3016/signin')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:3016/signin')
      .auth('foo','bar')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on a good login', () => {
    return superagent.get('http://localhost:3016/signin')
      .auth('mike','foo')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });
  it('should create a user at signup', () => {

    return superagent.post('http://localhost:3016/')
      .send({username: 'mike', password: 'foo'})
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(console.err);
  });
  it('should get a 400 in no request body is provided', () => {
    return superagent.post('http://localhost:3016/')
      .send()
      .then(response => {
        expect(response.statusCode).toBe(400);
      })
      .catch(console.err);
  });
  it('returns a status code of 404 for any routes that have not been registered', () => {
    return superagent.get('http://localhost:3016/doesnotexist')
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });

});