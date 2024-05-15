"use server";

    export default async function addShoes(formData) {
        try {
            const ShoesName = formData.get('ShoesName');
            const ImageFile = formData.get('ImageFile'); // Récupérer le fichier d'image
            const shoesPrice = formData.get('shoesPrice');
            const ShoesDescription = formData.get('ShoesDescription');
            const lienPaiement = formData.get('LienPaiement');
            
            const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes', {
                method: 'POST',
                body: formData
            });
    
            console.log(response);
            if (!response.ok) {
               
                throw new Error("Erreur lors de l'ajout de la chaussure");
            } else {
                console.log('Chaussure ajoutée avec succès');
            }
    
        } catch (error) {
            console.error(error);
        }
    }
    
      