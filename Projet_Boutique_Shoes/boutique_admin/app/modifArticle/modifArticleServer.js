"use server";

    export default async function modifShoes(formData) {
        const id = formData.get('id');
        const nom = formData.get('nom');
        const image = formData.get('image');
        const prix = formData.get('prix');
        const description = formData.get('description');
        const disponibilite = formData.get('disponibilite');
        const lien = formData.get('lien');

        await fetch(`https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shoesName: nom,
                shoesPrice: prix,
                lienPaiement: lien,
                disponible: disponibilite,
                shoesDescription: description
            })
        });
    }