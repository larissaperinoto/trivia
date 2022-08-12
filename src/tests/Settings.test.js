import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';

describe('Verifica a página Settings', () => {
  test('Verifica se a página é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole("button", { name: /configurações/i });
    expect(screen.getByRole("button", { name: /configurações/i })).toBeInTheDocument();
    userEvent.click(settingsButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/settings');
    expect(screen.getByRole("heading", { name: /setting/i })).toBeInTheDocument();
  });
});