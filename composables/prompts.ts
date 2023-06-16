export function generatePrompt() {

    function summarizing({ text, words, topic }: { text: String, words: String, topic: String }) {
        return ` 
        Summarize the following text delimited by triple backtics, in at most ${words} and 
        focusing on aspects that are relevant to ${topic}
        `
    }

    return { summarizing }
}