"use server";

    export default async function modifShoes(formData,token) {
        try {
         
           formData.get("disponible") ? formData.set("disponible", true) : formData.set("disponible", false);
            
           if (!token) 
            {
                throw new Error("Token non trouvé dans le localStorage");
            }
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