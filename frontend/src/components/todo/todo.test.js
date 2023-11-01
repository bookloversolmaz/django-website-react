// import {render, screen, cleanup} from '@testing-library/react';
// import ToDo from './todo';

test('the data is Kitchen', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBe('Kitchen');
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(callback);
  });