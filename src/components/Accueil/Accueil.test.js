// Accueil.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accueil from './Accueil';
import accueilData from './Accueil.json';

test('chaque paragraphe du contenu de l\'accueil (Accueil.json) est présent dans le document', () => {
  // Rendre le composant Accueil
  render(<Accueil />);

  // Vérifier si chaque paragraphe de accueilData est présent dans le document
  accueilData.forEach((paragraphe) => {
    const paragraphElement = screen.getByText(paragraphe);
    expect(paragraphElement).toBeInTheDocument();
  });
});
