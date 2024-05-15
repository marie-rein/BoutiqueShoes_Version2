"use server";

export default async function Register(formData) {
    try {
        const Username = formData.get('username');
        const Email = formData.get('email'); // Récupérer le fichier d'image
        const Password = formData.get('password');
 
        
        const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/authentification/register-admin', {
            method: 'POST',
            body: formData
        });

        console.log(response);
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de l\'administrateur");
        } else {
            console.log('Administrateur ajouté avec succès');
        }

    } catch (error) {
        console.error(error);
    }
}