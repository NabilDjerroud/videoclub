import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App/App";

function Film() {
  const { id } = useParams();
  const context = useContext(AppContext);

  const [film, setFilm] = useState({});

  useEffect(() => {
    fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`)
      .then(reponse => reponse.json())
      .then(data => {
        setFilm(data);
      });
  }, [id]);

  async function soumettreNote() {
    let aNotes = film.notes ? [...film.notes, 1] : [1];

    const oOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: aNotes }),
    };

    let putNote = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`, oOptions);
    let getFilm = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`);

    Promise.all([putNote, getFilm])
      .then(reponse => reponse[1].json())
      .then(data => {
        setFilm(prevData => ({ ...prevData, notes: data.notes }));
      });
  }

  async function soumettreCommentaire(e) {
    e.preventDefault();

    let aCommentaires = film.commentaires ? [...film.commentaires, { commentaire: 'Je suis un commentaire que vous aurez à dynamiser', auteur: context.nom }] : [{ commentaire: 'Je suis un commentaire que vous aurez à dynamiser', auteur: context.nom }];

    const oOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentaires: aCommentaires }),
    };

    let putCommentaire = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`, oOptions);
    let getFilm = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`);

    Promise.all([putCommentaire, getFilm])
      .then(reponse => reponse[1].json())
      .then(data => {
        setFilm(prevData => ({ ...prevData, commentaires: data.commentaires }));
      });
  }

  let blockAjoutCommentaire = context.estLog && (
    <form onSubmit={soumettreCommentaire}>
      <textarea name='commentaire' placeholder="Ajoutez votre commentaire"></textarea>
      <button>Soumettre</button>
    </form>
  );

  //mettre une chaine de caractere vide
  let genresFilm = '';

  //vérifier si il y a plus d'un genre
  if (film.genres && film.genres.length > 0) {
    //utiliser la methode join pour joindre un séparateur 
    genresFilm = film.genres.join(' / ');
  }

  return (
    <main>
      <img src={`/img/${film.titreVignette}`} alt={film.titreVignette} />
      <h2>{film.titre}</h2>
      <p>Réalisation: {film.realisation}</p>
      <p>Année: {film.annee}</p>
      <p>Genres: {genresFilm}</p>
      <p>Description: {film.description}</p>
      <p>Notes: {film.notes}</p>

      <button onClick={soumettreNote}>Note</button>
      {blockAjoutCommentaire}
    </main>
  );
}

export default Film;
