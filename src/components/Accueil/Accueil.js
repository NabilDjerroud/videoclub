import './Accueil.css';
import accueilData from './Accueil.json'; // Importer les données depuis le fichier Accueil.json

function Accueil() {
  return (
    <main className="accueil-container">
      <h2 className="accueil-title">Accueil VideoClub</h2>

      {/* j'utilise la méthode map pour parcourir les données */}
        {accueilData.map((paragraphe, index) => ( 
     
            <p key={index} className="accueil-paragraph">{paragraphe}</p>

        ))}

    </main>
  );
}

export default Accueil;