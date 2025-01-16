import axios from "axios";

export interface OpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        message: {
            role: "assistant";
            content: string;
        };
        finish_reason: string;
        index: number;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/**
 * Make a query to the OpenAI API.
 * @param {string} messageUser - Mensaje proporcionado por el usuario.
 * @returns {Promise<OpenAIResponse>} - Promise respons of OpenAI.
 * @throws {Error} - Error in case the request fails.
 */
export const fetchOpenAIResponse = async (
    messageUser: string
): Promise<OpenAIResponse> => {

    const apiKey = "Your_API_Key";
    const request = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: messageUser,
            },
        ],
    };
    try {
        const response = await axios.post<OpenAIResponse>(
            "https://api.openai.com/v1/chat/completions",
            request,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error("Error en la solicitud por favor verifica tu conexion.");
    }
};