 "use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import addShoesPanier from '../panier/addPanierServer';

function ShoesDetails({ chaussureId }) {
  const [chaussure, setChaussure] = useState({});
  const [selectedTaille, setSelectedTaille] = useState('');
  const [articlesDisponibles, setArticlesDisponibles] = useState(0);
  const [quantite, setQuantite] = useState(1); 
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');


  const handleChangeQuantite = (event) => {
    setQuantite(parseInt(event.target.value)); 
  };

  useEffect(() => {
    async function fetchChaussure() {
      try {
        const response = await fetch(`https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes/${chaussureId}`);
        const json = await response.json();
        setChaussure(json);
        setImageUrl(`data:image/png;base64,${json.image}`);
       
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    fetchChaussure();
  }, [chaussureId]);

  useEffect(() => {
    if (selectedTaille) {
      const index = chaussure.shoesSize.indexOf(selectedTaille);
      if (index !== -1) {
        setArticlesDisponibles(chaussure.totalParTaille[index]);
      }
    }
  }, [selectedTaille, chaussure]);

  useEffect(() => {
    if (selectedTaille && articlesDisponibles > 0) {
      const newOptions = [];
      for (let i = 1; i <= articlesDisponibles; i++) {
        newOptions.push(<option key={i} value={i}>{i}</option>);
      }
      setOptions(newOptions);
    }
  }, [selectedTaille, articlesDisponibles]);

  const handleTailleChange = (event) => {
    setSelectedTaille(event.target.value);
  };

  async function addChaussurePanier(formData) {
    try {
      await addShoesPanier(formData, chaussureId);
      console.log(formData);
      alert("Article ajouté au panier");     
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article au panier :", error);
    }
  }
  if (chaussure.disponible || chaussure.NbrEnStock > 0) {
  return (
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-6 col-lg-6">
          <Image src={imageUrl} alt={chaussure.shoesName} width={280} height={300} />
          <p className="col-8 col-lg-8 contenuLambda"><h3>Description</h3> {chaussure.shoesDescription}</p>
        </div>
        <div className="col-6 col-lg-6">
          <form action={addChaussurePanier}>
            <h2 className="col-12 col-lg-12">{chaussure.shoesName}</h2>
            <p className="col-12 col-lg-12 contenuLambda">Prix: {chaussure.shoesPrice}$CA</p>
            <label htmlFor="taille" className="col-4 col-lg-4 contenuLambda">Sélectionner la taille :</label>
            <select id="taille" className="col-8 col-lg-8 contenuLambda" style={{ width: '170px' }} align="left" name="shoesSize" onChange={handleTailleChange} required>
              <option value="">Choisissez une taille</option>
              {chaussure.shoesSize && chaussure.shoesSize.map((taille, index) => (
                <option key={index} value={taille} >{taille} EU</option>
              ))}
            </select>
            <br />
            <br />
            <p className="col-12 col-lg-12  contenuLambda">Nombre d'articles disponibles: {articlesDisponibles}</p>
            <p className="card-text col-12 col-lg-12 contenuLambda">Quantité:
              <select value={quantite} onChange={handleChangeQuantite} name="quantiteShoes">
                {options}
              </select>
            </p>
            <button type='submit' className="btn btn-outline-danger">Ajouter au panier</button>
          </form>
        </div>
      </div>
    </div>
  );
}
  else {
    return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-lg-12">
                    <h1 className="scrolling-text">Cet article n'est actuellement pas disponible.</h1>
                    </div>
                </div>
            </div>
        );
  }
}

export default ShoesDetails;
