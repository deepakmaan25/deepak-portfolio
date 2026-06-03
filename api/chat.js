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
        ...messages
      ],
      max_tokens: 120,
      temperature: 0.65,
      stream: true
    }),
  })

  // Stream the response back as SSE
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const reader = groqRes.body.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(l => l.trim())

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') {
          res.write('data: [DONE]\n\n')
          continue
        }
        try {
          const parsed = JSON.parse(data)
          const delta = parsed?.choices?.[0]?.delta?.content
          if (delta) {
            res.write(`data: ${JSON.stringify({ token: delta })}\n\n`)
          }
        } catch {
          // malformed chunk, skip
        }
      }
    }
  } finally {
    res.end()
  }
}
