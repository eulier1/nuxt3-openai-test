import { Configuration, OpenAIApi } from 'openai'
import { generatePrompt } from "../utils/prompts";

export default defineEventHandler(async (event) => {
    const { openAIKey: apiKey } = useRuntimeConfig()

    const { url = '', words = '', topics = '' } = await readBody(event)

    if (!url)
        return event.res.end('No url provided')

    if (!words)
        return event.res.end('No words provided')

    if (!topics)
        return event.res.end('No topics provided')

    const configuration = new Configuration({ apiKey })
    const openai = new OpenAIApi(configuration)

    // OpenAI config
    const model = 'text-davinci-002'
    const prompt = generatePrompt().summarizing({ url, words, topics })
    const temperature = 0

    try {
        const completion = await openai.createCompletion({
            model,
            prompt,
            temperature,
        })
        const result = completion.data.choices[0].text || ''
        return {
            result
        }
    } catch (error: any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data.error.message);
            return {
                result: `${error.response.status} : ${error.response.data.error.message}`
            }
        } else {
            console.error(`Error with OpenAI API request: ${error.message}, ${error.response.status}, ${error.response.data}`);
            return {
                result: `${error.response.status} : ${error.response.data.error.message}`
            }
        }
    }
})