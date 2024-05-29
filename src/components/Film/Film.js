import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App/App";
import './Film.css';
import Vote from "../Vote/Vote";
import Commentaire from '../Commentaire/Commentaire';

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
  
    let commentaireText = e.target.commentaire.value;
  
    if (commentaireText.trim() === '') {
      // Si le commentaire est vide, ne rien faire
      return;
    }
  
    let nouveauCommentaire = {
      commentaire: commentaireText,
      auteur: context.nom
    };
  
    let nouveauxCommentaires = film.commentaires ? [...film.commentaires, nouveauCommentaire] : [nouveauCommentaire];
  
    const oOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentaires: nouveauxCommentaires }),
    };
  
    let putCommentaire = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`, oOptions);
    let getFilm = await fetch(`https://four1f-tp1-nabildjerroud-1.onrender.com/api/films/${id}`);
  
    Promise.all([putCommentaire, getFilm])
      .then(reponse => reponse[1].json())
      .then(data => {
        setFilm(prevData => ({ ...prevData, commentaires: data.commentaires }));
      });
  
    // Effacer le champ de commentaire après soumission
    e.target.reset();
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
        <div className="film-details">
          <div className="film-image">
            <img src={`/img/${film.titreVignette}`} alt={film.titreVignette} />
          </div>
          <div className="film-info">
            <h2>{film.titre}</h2>
            <p>Réalisation: {film.realisation}</p>
            <p>Année: {film.annee}</p>
            <p>Genres: {genresFilm}</p>
            <p>Description: {film.description}</p>
            <p>Notes: {film.notes}</p>
            {/* Intégration du composant Vote */}
            <Vote />
            {blockAjoutCommentaire}
            <Commentaire commentaires={film.commentaires} />
          </div>
        </div>
      </main>
    );
}
export default Film;
