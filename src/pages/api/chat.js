export default async function handler (req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt: userPrompt } = req.body

  if (!userPrompt) return res.status(400).end()

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: userPrompt,
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      console.error(response.statusText)
      console.log('1')
      return res.status(500).json({ error: 'OpenAi API error' })
    }

    const json = await response.json()
    return res.status(200).json({ response: json.choices[0].text })
  } catch (e) {
    console.log('2')
    console.error(e)
    res.status(500).json({ error: e })
  }
}
