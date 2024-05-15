"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Register from "./register";

export default function RegisterAdmin() {
  const router = useRouter();
  async function addAdmin(formData) {
    try {
      await Register(formData);
     
      router.push('../loginAdmin');
    } catch (error) {
       
      console.error('Erreur lors de l\'ajout de l\'Administrateur :', error);
    }
  }

return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 bg-light shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Register Administrateur</h2>
              <form action={addAdmin}>
                <div className="form-group contenuLambda">
                  <label htmlFor="nom">Nom d'utilisateur</label>
                  <input type="text" className="form-control " id="username" name="username" placeholder="Entrez votre nom d'utilisateur" required />
                </div>
                <br />
                <div className="form-group contenuLambda">
                  <label htmlFor="nom">Addresse courriel</label>
                  <input type="email" className="form-control " id="email" name ="email" placeholder="Entrez votre addresse courriel" required/>
                </div>
                <br />
                <div className="form-group contenuLambda">
                  <label htmlFor="motDePasse" >Mot de passe</label>
                  <input type="password" className="form-control" id="password" name ="password" placeholder="Entrez votre mot de passe" required/>
                </div>
                <br />
                <button type="submit" className="btn btn-danger btn-block ">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}