export default async function handler(req, res) {
    console.log("Request Method:", req.method);
    console.log("Request Body:", req.body);

    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        res.status(200).json({ message: 'Your message has been received!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
