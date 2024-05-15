"use server";

export default async function Login(formData) {
    try {
        const Username = formData.get('username');
        const Password = formData.get('password');
 
        
        const response = await fetch('https://projet05-dicjprog4.cegepjonquiere.ca/api/authentification/login', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error("Erreur lors du login");
        }

    } catch (error) {
        console.error(error);
    }
}