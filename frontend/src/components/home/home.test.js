import { render, screen } from '@testing-library/react';
import Home from './home.js';
import React from 'react';

describe('Home', () => {
    test('renders homepage correctly', async () => {
      // Render the Home component
      render(<Home />)
  
      // Assert that the homepage title is rendered
      const homepageTitle = screen.getByRole('heading', { name: 'Welcome to the Homepage' });
      expect(homepageTitle).toBeInTheDocument();
  
      // Assert that the link to the to-do page is rendered
      const todoLink = screen.getByRole('link', { name: 'To do page' });
      expect(todoLink).toBeInTheDocument();
      expect(todoLink.getAttribute('href')).toBe('/todo'); // Assuming the link should navigate to '/todo'
    });
  });