"use server";

    export default async function modifShoes(formData) {
        try {
            /*
            const shoesId = formData.get('shoesId');
            const shoesName = formData.get('shoesName');
            const imageFile = formData.get('image'); // Récupérer le fichier d'image
            const shoesPrice = formData.get('shoesPrice');
            const ShoesDescription = formData.get('shoesDescription');
            const lienPaiement = formData.get('lienPaiement');
            const disponible = formData.get('disponible');
            */
           formData.get("disponible") ? formData.set("disponible", true) : formData.set("disponible", false);
            
            const response = await fetch(`https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes/${formData.get('shoesId')}`, {
                method: 'PUT',
                body: formData
            });
    
            if (!response.ok) {
               
                throw new Error("Erreur lors de la modification de la chaussure");
            } else {
                console.log('Chaussure modifiée avec succès');
            }
        }
        catch (error) {
            console.error(error);
        }
       
    }