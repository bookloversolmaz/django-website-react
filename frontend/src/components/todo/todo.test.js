import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ToDo from './todo.js';

// Create jest.mock to function to automatically mock the axios module
jest.mock('axios');

