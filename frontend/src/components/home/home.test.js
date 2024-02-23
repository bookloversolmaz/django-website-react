import { render, screen } from '@testing-library/react';
import Home from './home.js';
import axios from 'axios';
import React from 'react';

// Mock the axios module
jest.mock('axios');

describe('Home Component', () => {
  test('renders homepage correctly', async () => {
    // Define the mocked response data
    const mockedResponseData = {
      data: {
        title: 'Welcome to the Homepage',
      },
    };

    // Set up the Axios mock implementation to return the mocked response
    axios.get.mockResolvedValue(mockedResponseData);

    // Render the component
    render(<Home />);

    // Assert that the expected content is rendered
    expect(await screen.findByText('Welcome to the Homepage')).toBeInTheDocument();
  });;
});

// describe('Home', () => {
//     it('renders homepage correctly', () => {
//       // Render the Home component
//       const { container } = render(<Home />);

//       expect(container).toBeInTheDocument(); // Check if the component is rendered
//       expect(screen.getByRole('heading', { name: 'Welcome to the Homepage' })).toBeInTheDocument(); // Check for specific content
//        });
  
//       // Assert that the homepage title is rendered
//       // const homepageTitle = screen.getByRole('heading', { name: '/Welcome to the homepage/i' });
//       // expect(homepageTitle).toBeInTheDocument();

//       // const titleValue = screen.getByRole('heading', {level: 1});
//       // expect(titleValue).toBeInTheDocument();
//       // expect(titleValue).toHaveTextContent(/Welcome to the Homepage/i);

  
//       // Assert that the link to the to-do page is rendered
//       // const todoLink = screen.getByRole('link', { name: 'To do page' });
//       // expect(todoLink).toBeInTheDocument();
//       // expect(todoLink.getAttribute('href')).toBe('/todo'); // Assuming the link should navigate to '/todo'
//     });