// Film.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { AppContext } from '../App/App';
import Film from './Film';
import * as ReactRouter from 'react-router';

// Mock de useParams pour retourner un id de film
jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1' });

const mockFilmData = {
  titre: 'Test Film',
  realisation: 'Test Director',
  annee: 2021,
  genres: ['Action', 'Adventure'],
  description: 'Test Description',
  notes: [5, 4, 3],
  commentaires: [{ commentaire: 'Great movie!', auteur: 'John Doe' }]
};

// Mock de fetch pour retourner les données de film
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockFilmData)
  })
);

test('La moyenne et le nombre de vote(s) affichés via le composant Vote (ou Note) sont présents dans le document', async () => {
  const contextValue = { estLog: true, nom: 'Test User' };

  render(
    <AppContext.Provider value={contextValue}>
      <Router>
        <Film />
      </Router>
    </AppContext.Provider>
  );

  // Vérifier que les détails du film sont affichés
  expect(await screen.findByText('Test Film')).toBeInTheDocument();
  expect(screen.getByText(/Réalisation: Test Director/)).toBeInTheDocument();
  expect(screen.getByText(/Année: 2021/)).toBeInTheDocument();
  expect(screen.getByText(/Genres: Action \/ Adventure/)).toBeInTheDocument();
  expect(screen.getByText(/Description: Test Description/)).toBeInTheDocument();

  // Vérifier que le composant Vote affiche la moyenne et le nombre de votes
  const averageVote = (mockFilmData.notes.reduce((a, b) => a + b, 0) / mockFilmData.notes.length).toFixed(2);
  const voteCount = mockFilmData.notes.length;

  expect(await screen.findByText(`Moyenne: ${averageVote}`)).toBeInTheDocument();
  expect(screen.getByText(`Nombre de votes: ${voteCount}`)).toBeInTheDocument();
});
