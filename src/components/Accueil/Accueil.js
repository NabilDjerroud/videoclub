import './Accueil.css';
import accueilData from './Accueil.json'; // Importer les données depuis le fichier Accueil.json

function Accueil() {
  return (
    <main>
      <h2>Accueil VideoClub</h2>

      {/* j'utilise la méthode map pour parcourir les données */}
        {accueilData.map((paragraphe, index) => ( 
     
            <p key={index}>{paragraphe}</p>

        ))}

    </main>
  );
}

export default Accueil;