"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginAdmin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Password', password);

    try {
      const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/authentification/login', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
       
        if (data.token) {
          
          localStorage.setItem('token', data.token);
         
          router.push('../inventaire');
        } else {
          setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
        }
      } else {
        setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setErrorMessage('Erreur lors de la récupération des données.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 bg-light shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group contenuLambda">
                  <label htmlFor="nom">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom"
                    placeholder="Entrez votre nom d'utilisateur"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="form-group contenuLambda">
                  <label htmlFor="motDePasse">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    id="motDePasse"
                    placeholder="Entrez votre mot de passe"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <br />
                {errorMessage && <p className="text-danger contenuLambda">{errorMessage}</p>}
                <button type="submit" className="btn btn-danger btn-block ml-6">Connexion</button>
                <Link href="../registerAdmin" passHref>
                  <button type="button" className="btn btn-danger btn-block mr-5">Inscription</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
