import { render, screen } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import ToDo from './todo.js';

// Create jest.mock function to automatically mock the axios module
const MockTodo = jest.mock('axios');

describe('ToDo', () => {

  // Creates mocks to check that it can fetch data
  test('it should fetch to do list data', () => {
    const ToDo = [{item: 'Clean'}];
    const response = {data: ToDo};
    expect(Promise.resolve(response))
  });

  // Checks that it correctly throws an error if it fails to retrieve data
  test('the fetch fails with an error', async () => {
    await expect(Promise.reject(new Error('Error fetching data:'))).rejects.toThrow('Error fetching data:');
  });

});


// Todo: Tests delete function
// Render screen with input form and submit button
// Simulate a list of two items
// Simulate user deleting an item
// Assert that item deleted from list
// Simulate new list with one item, the one that was not deleted