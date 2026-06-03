export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system } = req.body || {}
  if (!messages) return res.status(400).json({ error: 'No messages' })

  const allMessages = [
    { role: 'system', content: system || '' },
    ...messages
  ]

  const response = await fetch('https://text.pollinations.ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: allMessages,
      model: 'openai',
      private: true,
      seed: 42
    }),
  })

  const text = await response.text()
  return res.status(200).json({ content: [{ type: 'text', text: text || 'Something went wrong.' }] })
}
