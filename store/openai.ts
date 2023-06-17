import { defineStore } from 'pinia'
import { ref } from "vue";


export const useOpenAIStore = defineStore('openai', () => {
    let promptResult = ref("")

    const summarizing = async ({ url, words, topics }: { url: string, words: string, topics: string }) => {
        const method = 'POST'
        const body = { url, words, topics }
        const { data } = await useFetch('/api/generate', {
            method,
            body,
        })

        promptResult.value = data.value?.result
    }

    return { promptResult, summarizing }

})
