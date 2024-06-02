"use client";

import React from 'react';
import Link from 'next/link';

function ShoesCard({id, nom, image, prix, disponibilite}) {
    const handleDeleteshoes = async (shoesId) => {
        try {

            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("Token non trouvé dans le localStorage");
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (!userRole || userRole.toLowerCase() !== 'administrateur') {
                throw new Error("Accès refusé. Seuls les administrateurs peuvent supprimer des chaussures.");
            }
            else 
            {

                const response = await fetch(`https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes/${shoesId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
  
            });
        }

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la chaussure');
            }

        } catch (error) {
            console.error('Erreur lors de la suppression de la chaussure :', error);
        }
    };
    return (
        <div className="cardEnd col-12 col-lg-4 " key={id} >
            <div className="card" style={{ width: '25rem' }}>     
                <img src={image} className="card-img-top" alt={nom}  width={450} height={350}/>
                <div className="card-body contenuLambda">
                    <h5 className="card-title">{nom}</h5>
                    <p className="card-text">{prix}$CA</p>
                    <p className="card-text">
                    {disponibilite ? (
                                <span className="text-muted">En stock</span>
                            ) : (
                                <span className="text-muted">En rupture de stock</span>
                            )}
                    </p>
                    
                    <Link href={`../modifArticle/${id}`} className="btn btn-primary">📖</Link> <Link href="/inventaire" className="btn btn-dark" onClick={() => handleDeleteshoes(id)}>🗑️</Link>
                </div>
            </div>
        </div>
        
    );
}
export default ShoesCard;