import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Blog from './blog';
import '@testing-library/jest-dom/extend-expect';

describe('Blog Component', () => {
  test('renders blog page correctly', () => {
    // Render the Blog component wrapped in MemoryRouter
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    // Assert that the loading indicator is not present
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Assert that the expected content is rendered
    expect(screen.getByText(/Example/i)).toBeInTheDocument();
    expect(screen.getByText(/Posted on/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Body Text/i)).toBeInTheDocument();
  });
});

