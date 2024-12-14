import { generativeModel } from "@/src/firebase/config";

export default async function getSentimentScore(content: string) {
    const prompt = `
    You are a sentiment analysis model focused on workplace discussions.
Analyze the text and determine its overall sentiment in the context of professional themes, such as leadership, culture, teamwork, fairness, or work-life balance.

Assign a sentiment score between -10 (very negative) and 10 (very positive).
Use 0 for neutral sentiment.
Consider the tone and attitude in the text, emphasizing its relevance to workplace themes.
Return only the score as a single integer.
Content to be analyzed:
    `
    
    const result = await generativeModel.generateContent(prompt + content);
    return parseInt(result.response.text())
}   