export function generatePrompt() {

    function summarizing({ url, words, topics }: { url: String, words: String, topics: String }) {
        return `
        Download the text from ${url}
        Summarize the following text delimited by triple backtics, in at most ${words} and 
        focusing on aspects that are relevant to ${topics}
        `
    }

    return { summarizing }
}