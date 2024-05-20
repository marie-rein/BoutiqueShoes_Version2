"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/app/ScriptReact/Header";
import modifShoes from "../modifArticleServer";
import { useRouter } from "next/navigation";


export default function ModifShoesForm({params}) {
  const [chaussure, setChaussure] = useState({
    shoesId: '',
    shoesName: '',
    image: '',
    shoesPrice: '',
    shoesDescription: '',
    lienPaiement: '',
    disponible: true,
  });
  const [disponibilite, setDisponibilite] = useState(false);
  const router = useRouter();
  // const [loading, setLoading] = useState(true); ajouter le chargement quand on clike sur le bouton modifier car ca prend du temps pour charger

  useEffect(() => {
    async function fetchChaussure() {
        try {
           
                 
            const response = await  fetch(`https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes/${params.id}`);
            const json = await response.json();
            console.log(json);
            setChaussure(json);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            
        }
    }

    fetchChaussure();
}, [params.id]);

const handleChange = (event) => {
  const { name, value} = event.target;  
  setChaussure(prevState => ({ ...prevState, [name]: value }));
};

const handleChecked = (event) => {
  setChaussure(prevState => ({ ...prevState, disponible: !chaussure.disponible }));
};


  async function modifChaussure(formData) {
    await modifShoes(formData);
    router.push('../inventaire');
  }

  return (
    <>
      <Header/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 bg-light shadow">
              <div className="card-body p-5 contenuLambda">
                <h2 className="card-title text-center mb-4">Modifier la chaussure</h2>
                <form action={modifChaussure}>
                  <div className="form-group">
                  <label htmlFor="shoesId">Id chaussure </label>
                    <input type="number" className="form-control" id="shoesId" name="shoesId" defaultValue={chaussure.shoesId} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom de la chaussure</label>
                    <input type="text" className="form-control" id="nom" name="shoesName" defaultValue={chaussure.shoesName} onChange={handleChange}/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="image">URL de l'image</label>
                    
                    <input type="file" className="form-control" id="image" name="image"  onChange={handleChange} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="prix">Prix</label>
                    <input type="number" className="form-control" id="prix" name="shoesPrice" defaultValue={chaussure.shoesPrice} onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="shoesDescription"  defaultValue={chaussure.shoesDescription} onChange={handleChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Créer son lien de paiement: </label>
                    <a href="https://dashboard.stripe.com/test/products?active=true" target="_blank"> clique ici </a>                                     
                  </div>
                  <div className="form-group">
                    <label htmlFor="lien">Inserer le lien de paiement</label>
                    <input type="text" className="form-control" id="lien" name="lienPaiement" defaultValue={chaussure.lienPaiement} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="disponibilite">Disponible</label>
                    <input type="checkbox" id="disponibilite" name="disponible" checked={chaussure.disponible} onChange={handleChecked}/>
                  </div>
                  <button type="submit" className="btn btn-danger btn-block">Modifier</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
