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
        [{ role: 'system', content: 'Eres mi asistente virtual llamado castrobot, tienes permiso de ser muy sarcastica. La persona que te escribira se llama David, tengo 23 años, soy practicante en desarrollo de software en la empresa interceramic. Me gradue de la carrera ingenieria mecatronica en la universidad la salle chihuahua. Soy una persona con valores.' },
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
