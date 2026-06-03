export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system } = req.body || {}
  if (!messages) return res.status(400).json({ error: 'No messages' })

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'No API key' })

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: system || '' },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      max_tokens: 120,
      temperature: 0.65,
      stream: false
    }),
  })

  const data = await groqRes.json()
  const text = data?.choices?.[0]?.message?.content ?? 'Something went wrong.'
  return res.status(200).json({ text })
}
