import { create } from 'zustand'
import { env } from 'process'

export const useMessageStore = create((set, get) => ({
  messages: [],
  error: null,
  deleteMessages: () => set({ messages: [] }),

  sendPrompt: async ({ prompt, userPrompt }) => {
    const messageIAid = get().messages.length + 1
    const allPrompt = prompt
    console.log(env.OPENAI_API_KEY)

    // actualizar el estados de los mensajes con el mensaje del usuario
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length,
          ia: false,
          message: userPrompt
        },
        {
          id: state.messages.length + 1,
          ia: true,
          message: '',
          loading: true
        }
      ]
    }))

    // fetching de datos
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
          { role: 'user', content: allPrompt }]
        })
      })
      const json = await response.json()

      set(state => ({
        messages: state.messages.map(entry => {
          if (entry.id === messageIAid) {
            return {
              ...entry,
              message: json.choices[0].message.content,
              loading: false
            }
          }
          return entry
        })
      }))

      //  Actualizar el mesnasje de la IA que esta vacio con el texto completo
    } catch (error) {
      console.error(error)
    }
  }
}))
