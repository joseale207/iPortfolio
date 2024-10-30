// /api/contact.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Aquí puedes procesar los datos, como enviarlos por email o almacenarlos
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        res.status(200).json({ message: 'Your message has been received!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
