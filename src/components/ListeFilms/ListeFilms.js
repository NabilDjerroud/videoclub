import {useState, useEffect} from 'react';
import { easeInOut, motion } from 'framer-motion';
import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';


function ListeFilms() {

  const urlListeFilms = 'https://four1f-tp1-nabildjerroud-1.onrender.com/api/films';
  // const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [listeFilms, setListeFilms] = useState([]);
  const [filtre, setFiltre] = useState('');
  // const [className, setClasseMousseEnter ] = useState(' ');

  const [estCharge, setEstCharge] = useState(false);
  
  useEffect(() => {
    
    fetch(urlFiltre)
      .then(reponse => reponse.json())
      .then(data => {
        setListeFilms(data);
        setEstCharge(true)
      })
    }, [urlFiltre])

  const tuilesFilm = listeFilms.map((film, index) => {
    //ajout de id={index} pour les tests
    return <TuileFilm key={index} data={film} id={index}/>
  })


  /**
   * 
   * @param {Object} e 
   */
  function filtres(e){
    console.log('filtres');
    setUrlFiltre(`${urlListeFilms}`);
  }

  // function filtres(e, queryString){
  //   let filtre = e.target.textContent;

  //   setUrlFiltre(urlListeFilms + queryString)
  //   setFiltre(filtres);
  // }



  function testJest(e){
    e.target.textContent= 'Test';
  }

  const animBasVersHaut = {
    hidden : { opacity:0 , y: 25 },
    visible : {  opacity:1 , y: 0 , transition: {duration: 1.5, ease: 'easeInOut'}},
    exit : {opacity:0 , y: 25}
  }

  const animGaucheVersDroite = {
    hidden : { opacity:0 , x: -25 },
    visible : {  opacity:1 , y: 0 , transition: {duration: 1.5, ease: 'easeInOut'}},
    exit : {opacity:0 , x: -25}
  }

  return (
    <main>

      <section>
        { estCharge ? 
        <>
        <motion.div 
            key='filtre'
            initial= 'hidden'
            animate='visible'
            exit='exit'
            variants={animGaucheVersDroite}>
          <ul>
            <li onClick={(e) => {filtres(e)}} >Réalisateur alphabétique (A-Z)</li>
          </ul>
        </motion.div>
          {/* ajout de l'appel de la function testJest au clique  */}
          <h2 data-testid='titre' onClick={testJest}>Liste des films</h2>
          {/* <Filtres handleFiltres={filtres}> */}
        <motion.div 
            key='liste-film'
            className='liste-film mt-medium grid grid--4'
            initial= 'hidden'
            animate='visible'
            exit='exit'
            variants={animBasVersHaut}>

            {tuilesFilm}
          
          </motion.div>
        </>
        : '' }
      </section>
      
    </main>

  );
}

export default ListeFilms;
