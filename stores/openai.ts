import { defineStore } from 'pinia'
import { ref } from "vue";
import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "../composables/prompts";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const useOpenAIStore = defineStore('openai', () => {
    let promptResult = ref("prompt result")

    const summarizing = async ({ text, words, topic }: { text: string, words: string, topic: string }) => {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: generatePrompt().summarizing({ text, words, topic }),
                temperature: 0,
            });
            promptResult.value = completion.data.choices[0].text as string
        } catch (error: any) {
            // Consider adjusting the error handling logic for your use case
            if (error.response) {
                console.error(error.response.status, error.response.data);

                promptResult.value = `${error.response.status} : ${error.response.data}`
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                promptResult.value = `${error.response.status} : ${error.response.data}`
            }
        }
    }

    return { promptResult, summarizing }

})