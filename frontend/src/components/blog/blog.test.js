import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import Blog from './blog';

// Extend Jest's expect with DOM element matchers
import '@testing-library/jest-dom/extend-expect';

// Create jest.mock function to automatically mock the axios module
jest.mock('axios');

describe('Blog', () => {
  test('fetch list of blogs from blog dtabase in the backend', () => {
    
  });



});