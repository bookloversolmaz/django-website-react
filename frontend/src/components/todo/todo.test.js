import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { ToDo, componentDidMount } from './todo.js';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

// Creates mocks to check that it can fetch data
test('it should fetch to do list data', () => {
  const ToDo = [{item: 'Clean', description: 'Do laundry'}];
  const response = {data: ToDo};
  axios.get.mockImplementation(() => Promise.resolve(response))
});

// Checks that it correctly throws an error if it fails to retrieve data
test('the fetch fails with an error', async () => {
  await expect(Promise.reject(new Error('Error fetching data:'))).rejects.toThrow('Error fetching data:');
});
