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

    const initialStateMock2 = {
        name: 'Maria',
        assertions: 4,
        score: 350,
        gravatarEmail: 'maria@mail.com',
    }

    localStorage.setItem('ranking', JSON.stringify([initialStateMock2]));
    renderWithRouterAndRedux(<App />, initialStateMock, '/feedback');

    userEvent.click(screen.getByRole('button', { name: /Ranking/i}));

    expect(screen.getByRole("heading", { name: /ranking/i })).toBeInTheDocument();

    const playerName = screen.getAllByTestId(/player-name-/i);
    expect(playerName.length).toBe(2);
    expect(playerName[0].innerHTML).toBe('Maria');
    expect(playerName[1].innerHTML).toBe('Jorge');

    const playerScore = screen.getAllByTestId(/player-score-/i);
    expect(playerScore[0].innerHTML).toBe('350');
    expect(playerScore[1].innerHTML).toBe('240');

    const button = screen.getByRole("button", { name: /início/i });
    expect(button).toBeInTheDocument();
    

    userEvent.click(button);

    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });
});