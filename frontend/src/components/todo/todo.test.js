import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ToDo from './todo.js';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

test('it should fetch to do list data', () => {
  const ToDo = [{item: 'Clean', description: 'Do laundry'}];
  const response = {data: ToDo};
  axios.get.mockImplementation(() => Promise.resolve(response))
});

// Testing for async errors using Promise.catch.
// it('tests error with promises', () => {
//   expect.assertions(2);
//   return componentDidMount().catch(e =>
//     expect(e).toEqual({
//       error: 'Error fetching data:',
//     }),
//   );
// });

test('the fetch fails with an error', async () => {
  await expect(ToDo.componentDidMount()).rejects.toMatch('Error fetching data:');
});
