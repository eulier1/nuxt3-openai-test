import { defineStore } from 'pinia'
import { ref } from "vue";


export const useOpenAIStore = defineStore('openai', () => {
    let promptResult = ref("")
    let loading = ref(false)

    const summarizing = async ({ url, words, topics }: { url: string, words: string, topics: string }) => {
        loading.value = true
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

    return { promptResult, loading, summarizing }

})
