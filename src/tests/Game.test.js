import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Game from '../pages/Game';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';

describe('Verifica a renderização da página Game', () => {

  const token = '6d8f1c78fcc17f5d62b0f5a5ba9f65359d527b2771c12a3a1b8e003e82a46e98';
  localStorage.setItem('token', token);

  fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData)
  });

  const initialStateMock = {
    player: {
      name: 'Jorge',
      assertions: 0,
      score: 0,
      gravatarEmail: 'jorge@mail.com',
    }
  }

  jest.useFakeTimers();

  test('Verifica se o Header está sendo renderizado na página', () => {
    renderWithRouterAndRedux(<App />, {}, '/game-trivia');

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /user/i })).toBeInTheDocument();
    expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  });

  test('Verifica se a API está sendo chamada e o jogo renderizado corretamente', async () => {

    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<Game />, initialStateMock);

    await waitFor(() => expect(fetch).toBeCalled());

    expect(screen.getByTestId('header-score').innerHTML).toBe('0');
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.getByTestId('question-category')).toBeInTheDocument();
    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getByTestId('answer-options')).toBeInTheDocument();
    expect(screen.getAllByTestId(/wrong-answer-/i).length).toBe(3);

    const correctAnswer = screen.getByTestId(/correct-answer/i);
    expect(correctAnswer).toBeInTheDocument();

    userEvent.click(correctAnswer);

    expect(screen.getByTestId('header-score').innerHTML).toBe('100');

    expect(screen.getByTestId('question-category').innerHTML).toEqual('General Knowledge');

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).not.toBeTruthy();

    fireEvent.click(nextButton);

    expect(screen.getByTestId('question-category').innerHTML).toEqual('Geography');

    userEvent.click(screen.getByTestId(/correct-answer/i));
    expect(screen.getByTestId('header-score').innerHTML).toBe('140');
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByTestId('question-category').innerHTML).toEqual('Science: Gadgets');
    expect(screen.getByText('30')).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/correct-answer/i));
    expect(screen.getByTestId('header-score').innerHTML).toBe('180');
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByTestId('question-category').innerHTML).toEqual('History');

    userEvent.click(screen.getByTestId(/correct-answer/i));
    expect(screen.getByTestId('header-score').innerHTML).toBe('220');
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByTestId('question-category').innerHTML).toEqual('Entertainment: Video Games');

    userEvent.click(screen.getByTestId(/correct-answer/i));
    expect(screen.getByTestId('header-score').innerHTML).toBe('290');
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(pathname).toBe('/');
  });

  test('Verifica se ao acabar decorrer 30 segundos os botões de respostas são desabilitados', async () => {

    renderWithRouterAndRedux(<Game />);

    await waitFor(() => expect(fetch).toBeCalled());

    jest.advanceTimersByTime(31000)

    expect(screen.getByTestId(/correct-answer/i).disabled).toBeTruthy();
  });
});