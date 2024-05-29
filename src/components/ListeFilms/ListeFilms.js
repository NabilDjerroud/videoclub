import { useState, useEffect } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';
import Filtre from '../Filtre/Filtre';

function ListeFilms() {
  const urlListeFilms = 'https://four1f-tp1-nabildjerroud-1.onrender.com/api/films';
  const [listeFilms, setListeFilms] = useState([]);
  const [filmsFiltres, setFilmsFiltres] = useState([]);
  const [filtreActif, setFiltreActif] = useState('');
  const [estCharge, setEstCharge] = useState(false);

  useEffect(() => {
    fetch(urlListeFilms)
      .then(reponse => reponse.json())
      .then(data => {
        setListeFilms(data);
        setFilmsFiltres(data); // Initialize with all films
        setEstCharge(true);
      });
  }, []);

  const tuilesFilm = filmsFiltres.map((film, index) => (
    <Link to={`/film/${film.id}`} key={index}>
      <TuileFilm data={film} id={index} filtreActif={filtreActif} />
    </Link>
  ));

    /**
   * 
   * @param {Object} e 
   */
  // function filtres(e){
  //   console.log('filtres');
  //   setUrlFiltre(`${urlListeFilms}`);
  // }

  // function filtres(e, queryString){
  //   let filtre = e.target.textContent;

  //   setUrlFiltre(urlListeFilms + queryString)
  //   setFiltre(filtres);
  // }



//   function testJest(e){
//     e.target.textContent= 'Test';
//   }

  function appliquerFiltre(orderBy, orderDirection) {
    let sortedFilms = [...listeFilms];

    sortedFilms.sort((a, b) => {
      if (orderBy === 'annee') {
        return orderDirection === 'asc' ? a.annee - b.annee : b.annee - a.annee;
      } else {
        let valA = a[orderBy].toLowerCase();
        let valB = b[orderBy].toLowerCase();
        if (valA < valB) return orderDirection === 'asc' ? -1 : 1;
        if (valA > valB) return orderDirection === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setFilmsFiltres(sortedFilms);
    setFiltreActif(`${orderBy} ${orderDirection === 'asc' ? '(A-Z)' : '(Z-A)'}`);
  }

  const animBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: 25 }
  };

  const animGaucheVersDroite = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -25 }
  };

  return (
    <main>
      <section>
        {estCharge && (
          <>
            <motion.div key='filtre' initial='hidden' animate='visible' exit='exit' variants={animGaucheVersDroite}>
              <Filtre appliquerFiltre={appliquerFiltre} />
              {filtreActif && <p class="filtre-actif">Filtre actif: {filtreActif}</p>}
            </motion.div>
            <motion.div key='liste-film' className='liste-film mt-medium grid grid--4' initial='hidden' animate='visible' exit='exit' variants={animBasVersHaut}>
              {tuilesFilm}
            </motion.div>
          </>
        )}
      </section>
    </main>
  );
}

export default ListeFilms;