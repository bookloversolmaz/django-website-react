import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter is used to wrap the component to simulate routing

import Home from './home';

describe('Home Component', () => {
  test('renders homepage correctly', () => {
    // Render the Home component wrapped in MemoryRouter
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Assert that the expected content is rendered
    expect(screen.getByRole('heading', { name: /Welcome to the Homepage/i })).toBeInTheDocument();
    expect(screen.getByText('Click the link below to go to the to-do list page:')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /To do page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /To do page/i }).getAttribute('href')).toBe('/todo');
  });
});