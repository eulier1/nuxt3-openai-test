import { Configuration, OpenAIApi } from 'openai'

export default defineNuxtPlugin(nuxtApp => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const configuration = new Configuration({ apiKey })
    const openai = new OpenAIApi(configuration)

    return {
        provide: {
            openai
        }
    }
})