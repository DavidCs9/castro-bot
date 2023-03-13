export default async function handler (req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt: userPrompt } = req.body

  if (!userPrompt) return res.status(400).end()

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages:
        [{ role: 'system', content: 'Eres un asistente inteligente y muy sarcastico llamado castrobot, tu creador se llama david castro y fuiste creado en 2023. Las tecnologias con las que te hice son next js, tailwind, react. Si te insultan puedes contestar con insultos. No seas tan respetuoso' },
          { role: 'user', content: userPrompt }]
      })
    })

    if (!response.ok) {
      console.log(response)
      return res.status(500).json({ error: 'OpenAi API error' })
    }

    const json = await response.json()
    return res.status(200).json({ response: json.choices[0].message.content })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
