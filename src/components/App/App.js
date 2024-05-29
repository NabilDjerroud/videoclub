import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Admin from '../Admin/Admin'
import Entete from '../Entete/Entete';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Film from '../Film/Film';
import './App.css';
import { AnimatePresence } from 'framer-motion';

export const AppContext = React.createContext();

function App() {

  const location = useLocation();
  // const [estLog, setEstLog] = useState(false);
  const [usager , setUsager] = useState({estLog: false, nom: ''});

  function login(e){
    e.preventDefault();
    console.log('login');
    console.log(e.target.usager.value);
    let usager = e.target.usager.value;

    if (usager == 'admin'){
      setUsager(prevUsager => ({...prevUsager, estLog: true, nom: usager}));
      e.target.reset();
    }
  }

  function logout() {
    setUsager({ estLog: false, nom: '' });
  }


   return (
    <AppContext.Provider value={usager}>
      <Entete handleLogin={login} handleLogout={logout} />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Accueil />} />
          <Route path='/liste-Films' element={<ListeFilms />} />
          <Route path='/film/:id' element={<Film />} />
          <Route path='/admin' element={usager.estLog ? <Admin /> : <Navigate to='/' />} />
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;
