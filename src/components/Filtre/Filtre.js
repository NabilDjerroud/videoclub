import React from 'react';
import './Filtre.css';

function Filtre({ appliquerFiltre }) {
  return (
    <div className="filtre">
      <ul>
        <li onClick={() => appliquerFiltre('titre', 'asc')}>Titre alphabétique (A-Z)</li>
        <li onClick={() => appliquerFiltre('titre', 'desc')}>Titre alphabétique (Z-A)</li>
        <li onClick={() => appliquerFiltre('realisation', 'asc')}>Réalisateur alphabétique (A-Z)</li>
        <li onClick={() => appliquerFiltre('realisation', 'desc')}>Réalisateur alphabétique (Z-A)</li>
        <li onClick={() => appliquerFiltre('annee', 'desc')}>Par année (du plus récent)</li>
        <li onClick={() => appliquerFiltre('annee', 'asc')}>Par année (du plus ancien)</li>
      </ul>
    </div>
  );
}

export default Filtre;
