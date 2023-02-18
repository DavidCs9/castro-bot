import { create } from 'zustand'

export const useMessageStore = create((set, get) => ({
  messages: [],
  error: null,
  sendPrompt: async ({ prompt }) => {
    const messageIAid = get().messages.length + 1
    const userPrompt = prompt

    // actualizar el estados de los mensajes con el mensaje del usuario
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length,
          ia: false,
          message: prompt
        },
        {
          id: state.messages.length + 1,
          ia: true,
          message: ''
        }
      ]
    }))

    // fetching de datos
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userPrompt

        })
      })
      const json = await response.json()
      console.log(json.response)

      set(state => ({
        messages: state.messages.map(entry => {
          if (entry.id === messageIAid) {
            return {
              ...entry,
              message: json.response
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