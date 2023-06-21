import { defineStore } from 'pinia'
import { ref } from "vue";
import { generatePrompt } from "../server/utils/prompts";
import { OpenAIApi } from 'openai';

export const useOpenAIStore = defineStore('openai', () => {
    let promptResult = ref("")
    let loading = ref(false)

    const summarizing = async ({ url, words, topics }: { url: string, words: string, topics: string }) => {
        loading.value = true
        promptResult.value = ""
        const method = 'POST'
        const body = { url, words, topics }
        const { data, pending, error } = await useFetch('/api/generate', {
            method,
            body,
        })
        loading.value = pending.value

        if (data)
            promptResult.value = data.value?.result

        if (error)
            promptResult.value = error.value

    }

    const summarizingCSR = async ({ openai, url, words, topics }: { openai: OpenAIApi, url: string, words: string, topics: string }) => {
        // OpenAI config
        const model = 'text-davinci-002'
        const prompt = generatePrompt().summarizing({ url, words, topics })
        const temperature = 0
        promptResult.value = ''

        try {
            const completion = await openai.createCompletion({
                model,
                prompt,
                temperature,
            })
            const result = completion.data.choices[0].text || ''
            promptResult.value = result
        } catch (error: any) {
            // Consider adjusting the error handling logic for your use case
            if (error) {
                console.log(error);
                promptResult.value = `${error.response.status} : ${error.response.data.error.message}`
            } else {
                console.error(`Error with OpenAI API request: ${error.message}, ${error.response.status}, ${error.response.data}`);
                promptResult.value = `Error with OpenAI API request: ${error.message}, ${error.response.status}, ${error.response.data}`
            }
        }
    }

    return { promptResult, loading, summarizing, summarizingCSR }

})
