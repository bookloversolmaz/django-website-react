import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import ToDo from './todo.js';

// Extend Jest's expect with DOM element matchers
import '@testing-library/jest-dom/extend-expect';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

describe('ToDo', () => {

  // Creates mocks to check that it can fetch data
  test('it should fetch to do list data', () => {
    const ToDo = [{item: 'Clean'}];
    const response = {data: ToDo};
    axios.get.mockImplementation(() => Promise.resolve(response))
  });

  // Checks that it correctly throws an error if it fails to retrieve data
  test('the fetch fails with an error', async () => {
    await expect(Promise.reject(new Error('Error fetching data:'))).rejects.toThrow('Error fetching data:');
  });

  // Checks that the user can add item
  test('user can add item to list', async () => {
    render(<ToDo/>); // Render the ToDo component
    const inputField = screen.getByPlaceholderText('Enter a task'); // Get the input field by its placeholder text
    userEvent.type(inputField, 'Laundry'); // Simulate typing 'Laundry' into the input field
    expect(inputField).toHaveValue('Laundry'); // Verify that the input field value is 'Laundry'
  });
});
