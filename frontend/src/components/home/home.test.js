// import {render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import React from 'react';
// import axios from 'axios';
// import ToDo from './todo.js';

// // Create jest.mock function to automatically mock the axios module
// jest.mock('axios');


// describe('ToDo', () => {

//   // Creates mocks to check that it can fetch data
//   test('it should fetch to do list data', () => {
//     const ToDo = [{item: 'Clean'}];
//     const response = {data: ToDo};
//     axios.get.mockImplementation(() => Promise.resolve(response))
//   });

//   // Checks that it correctly throws an error if it fails to retrieve data
//   test('the fetch fails with an error', async () => {
//     await expect(Promise.reject(new Error('Error fetching data:'))).rejects.toThrow('Error fetching data:');
//   });

//   // Checks that the user can add item
//   test('user can add item to list', async () => {
//     render(<ToDo/>)    
//     userEvent.type(screen.getByRole(/textbox/i, 'Laundry'))    
//     expect(screen.getAllByPlaceholderText('Enter a task', {item: 'Laundry'}))
//   });

//   });