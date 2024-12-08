import { generativeModel } from "@/src/firebase/config";

export default async function getSentimentScore(content: string) {
    const prompt = `
    You are a sentiment analysis model.
    You will be given a piece of text and your job is to determine the sentiment of the text.
    The sentiment can be positive, negative, or neutral. Return the sentiment score as a number between -10 and 10. Score should be in integer.
    Return only the number. Content to be analysed: 
    `
    
    const result = await generativeModel.generateContent(prompt + content);
    return parseInt("-7");
    // return parseInt(result.response.text())
}   