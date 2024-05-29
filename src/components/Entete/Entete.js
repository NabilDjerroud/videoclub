import {useContext, useRef} from 'react';
import { AppContext } from '../App/App';
import { NavLink } from "react-router-dom";
import "./Entete.css";

function Entete(props) {

  // const elUsager = useRef();
  // console.log(props);
  
  const context = useContext(AppContext);
  console.log(context);

  // function login(e) {
  //   e.preventDefault();
  //   console.log(e.target.usager.value);
  //   console.log(elUsager.current.value);
  // }

  return (
    <header>
      <div className="wrapper">
        <div class="navigation" className="entete">
          <NavLink to="/">
            <h1>VideoClub</h1>
          </NavLink>
          <nav>
            {context.estLog ? (
              <>
                <NavLink to='/admin'>Admin</NavLink>
                <button onClick={props.handleLogout}>Logout</button>
              </>
            ) : ''}
            <NavLink to="liste-films">Liste des films</NavLink>
          </nav>
        </div>
        <form onSubmit={props.handleLogin}>
          {context.estLog ? <p>Bonjour, {context.nom}</p> : <input type="text" name="usager" placeholder="Usager" />}
          <button>{context.estLog ? 'Logout' : 'Login'}</button>
        </form>
      </div>
    </header>
  );
}

export default Entete;
