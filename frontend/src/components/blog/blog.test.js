import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import Blog from './blog';

// Extend Jest's expect with DOM element matchers
import '@testing-library/jest-dom/extend-expect';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

describe('Blog Component', () => {
  test('renders blog page correctly', () => {
    // Render the Home component wrapped in MemoryRouter
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

        // Assert that the expected content is rendered
        expect(screen.getByRole('heading', { name: /Bloge/i })).toBeInTheDocument();
        // expect(screen.getByText('Click the link below to go to the to-do list page:')).toBeInTheDocument();
        // expect(screen.getByRole('link', { name: /To do page/i })).toBeInTheDocument();
        // expect(screen.getByRole('link', { name: /To do page/i }).getAttribute('href')).toBe('/todo');
      });
    });
