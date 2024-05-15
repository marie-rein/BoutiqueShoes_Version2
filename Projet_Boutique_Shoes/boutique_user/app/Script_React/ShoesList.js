 "use client";

import React, { useState, useEffect } from 'react';
import ShoesCard from './ShoesCard';

function ShoesList() {
    const [chaussures, setChaussures] = useState([]);

    useEffect(() => {
        async function fetchChaussures() {
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

                setChaussures(chaussuresAvecImages);
            } catch (error) {
               console.error(error);
            }
        }

        fetchChaussures();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row align-items-center" >
                {chaussures.map(ch => (
                    <ShoesCard key={ch.shoesId} id={ch.shoesId} nom={ch.shoesName} imageUrl={ch.imageUrl} prix={ch.shoesPrice} disponibilite={ch.disponible}/>
                ))}
            </div>
        </div>
    );
}

export default ShoesList;
