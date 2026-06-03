export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system } = req.body || {}
  if (!messages) return res.status(400).json({ error: 'No messages' })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'No API key' })

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system || '' }] },
        contents: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      }),
    }
  )

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Something went wrong.'
  return res.status(200).json({ content: [{ type: 'text', text }] })
}
