import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Verifica a renderização do componente Feedback', () => {
  test('Verifica se o Header está sendo renderizado na página', () => {
    renderWithRouterAndRedux(<Feedback />);

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /user/i })).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  });

  test('Verifica a renderização da menssagem de feedback', () => {
    const initialStateMock = {
      player: {
        name: 'Jorge',
        assertions: 5,
        score: 450,
        gravatarEmail: 'jorge@mail.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialStateMock);

    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
    expect(screen.getByText('Well Done!')).toBeInTheDocument();
    expect(screen.getByTestId('header-score').innerHTML).toBe('450');
  });

  test('Verifica se as informações do Player são renderizadas', () => {
    const initialStateMock = {
      player: {
        name: 'Jorge',
        assertions: 1,
        score: 40,
        gravatarEmail: 'jorge@mail.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialStateMock);

    expect(screen.getByText('Número de acertos:')).toBeInTheDocument();
    expect(screen.getByText('Sua pontuação é:')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-score')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-score').innerHTML).toBe('40');
    expect(screen.getByTestId('feedback-total-question')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-question').innerHTML).toBe('1');
  });

  test('Verifica se o botão Play Again é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;

    history.push('/feedback');

    const buttonPlayAgain = screen.getByRole("button", { name: /play again/i });
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);

    expect(pathname).toBe('/');

    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });
})