"use client";
import Login from "./login";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginAdmin() {
  const router = useRouter();
  async function LoginForm(formData) {
    try {
      await Login(formData);
     
      router.push('../inventaire');
    } catch (error) {
       
      console.error('Erreur lors du login administrateur :', error);
    }
  }

    return (
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card border-0 bg-light shadow">
                    <div className="card-body p-5">
                      <h2 className="card-title text-center mb-4">Login</h2>
                      <form action={LoginForm}>
                        <div className="form-group contenuLambda">
                          <label htmlFor="nom">Nom d'utilisateur</label>
                          <input type="text" className="form-control " id="nom" placeholder="Entrez votre nom d'utilisateur" name="username" />
                        </div>
                        <br />
                        <div className="form-group contenuLambda">
                          <label htmlFor="motDePasse" >Mot de passe</label>
                          <input type="password" className="form-control" id="motDePasse" placeholder="Entrez votre mot de passe" name="password" />
                        </div>
                        <br />
                       
                        <button type="submit" className="btn btn-danger btn-block ml-6">Connexion</button> 
                        <button type="submit" className="btn btn-danger btn-block  mr-5"><a href="../registerAdmin">Inscription</a></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    
  }