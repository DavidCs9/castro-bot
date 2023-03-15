import { create } from 'zustand'

export const useMessageStore = create((set, get) => ({
  messages: [],
  error: null,
  deletebtn: false,
  deleteMessages: () => set({ messages: [], deletebtn: false }),

  sendPrompt: async ({ prompt, userPrompt }) => {
    const messageIAid = get().messages.length + 1
    const allPrompt = prompt

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
      ],
      deletebtn: true
    }))

    // fetching de datos
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: allPrompt
        })
      })
      const json = await response.json()

      set(state => ({
        messages: state.messages.map(entry => {
          if (entry.id === messageIAid) {
            return {
              ...entry,
              message: json.response,
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
