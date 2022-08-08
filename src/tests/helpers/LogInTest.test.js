import React from 'react';
import App from '../../App';


import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { getByTestId, getByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Testes tela de login', () => {
    const initialStateMock = {
        name: 'Jorge',
        assertions: 0,
        score: 0,
        gravatarEmail: 'jorge@mail.com',
      };
    it('Testa se página de LogIn é renderizada', () => {
        renderWithRouterAndRedux(<App />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
    });
    it('Testa funcionamento do LogIn', async () => {
        const { store, history } = renderWithRouterAndRedux(<App />, initialStateMock);
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        const play = screen.getByTestId('btn-play');

        expect(play).toHaveAttribute('disabled');

        userEvent.type(name, 'Fulano');
        userEvent.type(email, 'fulano@trybemail.com');

        expect(name.value).toBe('Fulano');
        expect(email.value).toBe('fulano@trybemail.com');

        expect(play).not.toHaveAttribute('disabled');

        userEvent.click(play);
        await screen.findByText('Fulano');
        expect(history.location.pathname).toBe('/game-trivia');


    })
});