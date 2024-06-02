"use server";

    export default async function addShoes(formData,token) {
        try {
            const ShoesName = formData.get('ShoesName');
            const Image = formData.get('Image'); // Récupérer le fichier d'image
            const shoesPrice = formData.get('shoesPrice');
            const ShoesDescription = formData.get('ShoesDescription');
            const lienPaiement = formData.get('LienPaiement');
            
           
        
            // Vérifier si le token est présent
            if (!token) {
                throw new Error("Token non trouvé dans le localStorage");
            }

            const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/Shoes', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes
                }
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
    
      