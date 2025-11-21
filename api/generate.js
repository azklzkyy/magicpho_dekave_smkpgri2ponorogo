export default async function handler(req, res) {
    const { prompt } = req.body;

    const API_KEY = process.env.GEMINI_KEY;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    prompt: { text: prompt }
                })
            }
        );

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
}
