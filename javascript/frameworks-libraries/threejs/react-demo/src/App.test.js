import React from 'react';
import * as THREE from 'three';
import { render } from '@testing-library/react';

import App from './App';

test('renders app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/reactjs/i);

  expect(linkElement).toBeInTheDocument();
});
