import { Configuration, OpenAIApi } from 'openai'
import { generatePrompt } from "../utils/prompts";
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const { openAIKey: apiKey } = useRuntimeConfig()

    const { url = '', words = '', topics = '' } = await readBody(event)

    if (!url)
        throw createError({
            statusCode: 400,
            statusMessage: 'No url provided'
        });

    if (!words)
        throw createError({
            statusCode: 400,
            statusMessage: 'No words provided'
        });

    if (!topics)
        throw createError({
            statusCode: 400,
            statusMessage: 'No topics provided'
        });

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
            throw createError({
                statusCode: parseInt(`${error.response.status}`),
                statusMessage: `${error.response.data.error.message}`
            });
        } else {
            console.error(`Error with OpenAI API request: ${error.message}, ${error.response.status}, ${error.response.data}`);
            throw createError({
                statusCode: parseInt(`${error.response.status}`),
                statusMessage: `${error.response.data.error.message}`
            });
        }
    }
})