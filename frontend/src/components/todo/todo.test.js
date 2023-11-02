import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ToDo from './todo.js';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

test('it should fetch to do list data', () => {
  const ToDo = [{item: 'Clean', description: 'Do laundry'}];
  const response = {data: ToDo};
  axios.get.mockResolvedValue(response);
});
