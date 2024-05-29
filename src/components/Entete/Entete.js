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
        <div className="entete">
          <NavLink to="/">
            <h1>VideoClub</h1>
          </NavLink>
        </div>
        <div className='navigation'>
          <nav>
            {context.estLog ? (
              <>
                <NavLink to='/admin'>Admin</NavLink>
              </>
            ) : null}
            <NavLink to="liste-films">Liste des films</NavLink>
          </nav>
        </div>
        <form onSubmit={context.estLog ? props.handleLogout : props.handleLogin}>
          {context.estLog ? (
            <>
              <p>Bonjour, {context.nom}</p>
              <button type="submit">Logout</button>
            </>
          ) : (
            <>
              <input type="text" name="usager" placeholder="Usager" />
              <button type="submit">Login</button>
            </>
          )}
        </form>
      </div>
    </header>

  );
}

export default Entete;
