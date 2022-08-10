import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Verifica a renderização da página de Ranking', () => {
  test('Verifica se os elementos estão sendo renderizado na página', () => {
    const initialStateMock = {
      player: {
        name: 'Jorge',
        assertions: 3,
        score: 240,
        gravatarEmail: 'jorge@mail.com',
      }
    }

    renderWithRouterAndRedux(<App />, initialStateMock, '/ranking');

    expect(screen.getByRole("heading", { name: /ranking/i })).toBeInTheDocument();

    const playerName = screen.getByTestId(/player-name-/i);
    expect(playerName).toBeInTheDocument();
    expect(playerName.innerHTML).toBe('Jorge');

    const playerScore = screen.getAllByTestId(/player-score-/i);
    expect(playerScore).toBeInTheDocument();
    expect(playerScore.innerHTML).toBe('240');

    const button = screen.getByRole("button", { name: /início/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });
});