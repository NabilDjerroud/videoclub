import "./Commentaire.css";


function Commentaire({ commentaires }) {
    return (
      <div className="commentaires">
        <h3>Commentaires</h3>
        {commentaires && commentaires.map((commentaire, index) => (
          <div key={index} className="commentaire">
            <p>{commentaire.commentaire}</p>
            <p>- {commentaire.auteur}</p>
          </div>
        ))}
      </div>
    );
  }


  export default Commentaire;