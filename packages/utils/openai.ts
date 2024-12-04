import axios from "axios";

export const getHuggingFaceResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_APP_HUGGING_FACE_API_KEY;  // Replace with your Hugging Face token
  const endpoint = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B"; // Replace with the model of your choice
  console.log("API Key:", apiKey);

  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await axios.post(
      endpoint,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Log the response structure
    console.log("Response structure:", response.data);

    const generatedText = response.data[0]?.generated_text;

    if (!generatedText) {
      throw new Error("Generated text not found in the response");
    }

    console.log("Generated text:", generatedText);
    return { text: generatedText.trim() };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch response from Hugging Face API");
  }
};
