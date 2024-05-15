"use client";

import React, { useState, useEffect } from 'react';
import ShoesCard from './ShoesCard';
import { Button } from 'bootstrap';
function ShoesList() {
    const [Shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchShoes() {
            try {

                const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes');
                if (!response.ok) {
                    throw new Error('Erreur de réseau ou serveur indisponible');
                }
                
                const json = await response.json();
              
                const chaussuresAvecImages = json.map(chaussure => ({
                    ...chaussure,
                    imageUrl: `data:image/png;base64,${chaussure.image}`
                }));
                setShoes(chaussuresAvecImages);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du serveur:', error);
            }
        }
        fetchShoes();
        const intervalId = setInterval(() => {
            fetchShoes(); 
        }, 2000);

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => {
            clearInterval(intervalId);
        };
    }, []);
   
    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                {loading ? (
                    <p>Chargement...</p>
                ) : Shoes.length > 0 ? (
                    Shoes.map(ch => (
                        <ShoesCard key={ch.shoesId} id={ch.shoesId} nom={ch.shoesName} image={ch.imageUrl} prix={ch.shoesPrice} disponibilite={ch.disponible}/>
                    ))
                ) : (
                    <h1 className="scrolling-text">Aucune chaussure enregistrée</h1>
                    )}
            </div>
        </div>
    );

}
export default ShoesList;