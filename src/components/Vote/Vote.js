import React, { useState } from 'react';

function Vote() {
  const [votes, setVotes] = useState([]);

  function ajouterVote(value) {
    setVotes(prevVotes => [...prevVotes, value]);
  }
  // calcul de la myenne source => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const moyenne = votes.length > 0 ? (votes.reduce((acc, curr) => acc + curr) / votes.length).toFixed(2) : null;

  return (
    <div className="vote">
      <div>
        <button value="1" onClick={() => ajouterVote(1)}>★</button>
        <button value="2" onClick={() => ajouterVote(2)}>★</button>
        <button value="3" onClick={() => ajouterVote(3)}>★</button>
        <button value="4" onClick={() => ajouterVote(4)}>★</button>
        <button value="5" onClick={() => ajouterVote(5)}>★</button>
      </div>
      <div>
        {/* afficher la moyenne ou le message aucun vote */}
        <strong>Moyenne:</strong> {moyenne !== null ? moyenne : 'Aucun vote enregistré'}
      </div>
      <div>
        {/* gestion du s du vote / votes */}
        <strong>Nombre de vote</strong>{votes.length > 1 && <strong>s</strong>}: {votes.length}
      </div>
    </div>
  );
}

export default Vote;
