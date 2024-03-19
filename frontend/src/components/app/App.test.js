import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test('renders home page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const homeHeading = screen.getByRole('heading', { name: /Welcome to the Homepage/i });
  expect(homeHeading).toBeInTheDocument();
});

test('renders todo page when navigating to /todo', () => {
  render(
    <MemoryRouter initialEntries={['/todo']}>
      <App />
    </MemoryRouter>
  );

  const todoHeading = screen.getByRole('heading', { name: /To do list/i });
  expect(todoHeading).toBeInTheDocument();
});

test('renders blog page when navigating to /blog', () => {
  render(
    <MemoryRouter initialEntries={['/blog']}>
      <App />
    </MemoryRouter>
  );

  const todoHeading = screen.getByRole('heading', { name: /Blog/i });
  expect(todoHeading).toBeInTheDocument();
});
