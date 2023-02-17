import React from 'react';
import { render, screen } from '@testing-library/react';
import AppScreen from './AppScreen';

test('renders learn react link', () => {
  render(<AppScreen />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
