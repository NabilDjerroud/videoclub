import { Link } from 'react-router-dom';
import './TuileFilm.css';

function TuileFilm(props) {
  
  // console.log(props);
  // console.log(props.data);
  
  return (
    <div>
       <Link to={`/film/${props.data.id}`}>
        {/* Ajout des props data pour vérifier si un element existe via les tests */}
        <article data-testid={`tuile-film-${props.id}`}>
          <img src={`/img/${props.data.titreVignette}`} alt={props.data.titre} />
          <h2>{props.data.titre}</h2>
          <p>Réalisateur: {props.data.realisation}</p>
          <p>Année: {props.data.annee}</p>
        </article>
      </Link>
    </div>
  );
}

export default TuileFilm;


