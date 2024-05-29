import './TuileFilm.css';

function TuileFilm(props) {
  
  // console.log(props);
  // console.log(props.data);

  const { data, id, filtreActif } = props;
  
  return (
    <div>
      <article data-testid={`tuile-film-${id}`}>
        <img src={`/img/${data.titreVignette}`} alt={data.titre} />
        <h2>{data.titre}</h2>
        {filtreActif && filtreActif.includes('realisation') && <p>Réalisateur: {data.realisation}</p>}
        {filtreActif && filtreActif.includes('annee') && <p>Année: {data.annee}</p>}
      </article>
    </div>
  );
}

export default TuileFilm;


