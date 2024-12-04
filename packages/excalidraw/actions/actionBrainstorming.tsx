import { register } from "./register";
import { getHuggingFaceResponse } from "../../utils/hfAI"; // Your API integration
import { StoreAction } from "../store";

export const Brainstorming = register({
  name: "Brainstorming",
  trackEvent: { category: "menu" },
  perform: async (elements, appState, _, app) => {
    try {
      console.log("AppState:", appState);

      // Get all elements currently on the screen
      const allElements = app.scene.getSelectedElements({
        selectedElementIds: appState.selectedElementIds,
        includeBoundTextElement: true,
        includeElementsInFrames: true,
      });
      console.log("Selected Elements:", allElements);

      // Extract relevant information from all elements
      const screenContent = allElements
        .map((element) => {
          if (element.type === "text") {
            return element.text;
          }
          if (element.type === "rectangle" || element.type === "ellipse") {
            return `A ${element.type} at (${element.x}, ${element.y}) with dimensions ${element.width}x${element.height}`;
          }
          if (element.type === "image") {
            return `An image at (${element.x}, ${element.y}) with source ${element.fileId}`;
          }
          return `An element of type ${element.type}`;
        })
        .join("\n");

      if (!screenContent.trim()) {
        return {
          appState: {
            ...appState,
            errorMessage: "No content available for brainstorming.",
          },
          storeAction: StoreAction.NONE,
        };
      }

      const prompt = `Given the following information about the elements on the screen, generate 3-4 questions based on the texts in the content 
                          that are relevant and help in brainstorming.:
                          "${screenContent}"`;

      // Get questions from Hugging Face API
      const { text } = await getHuggingFaceResponse(prompt);
      console.log("Generated questions:", text);

      // Use a more general regex to capture all numbered questions (e.g., "1. What...", "2. How...", etc.)
      const questionsStartIndex = text.search(/\d+\.\s+/);  // This should match any numbered question
      const questions = questionsStartIndex !== -1
        ? text.slice(questionsStartIndex)  // Slice from the first numbered question
            .split("\n")                    // Split into individual lines
            .map((line: string) => line.trim())  // Clean up each question
            .filter(Boolean)              // Remove empty lines
        : [];

      console.log("questions:", questions);

      // Update app state with brainstorming questions
      return {
        appState: {
          ...appState,
          brainstormingQuestions: questions,
          dropdownVisible: true,
        },
        storeAction: StoreAction.NONE,
      };
    } catch (error) {
      console.error("Brainstorming action failed. Error details:", error);

      return {
        appState: {
          ...appState,
          errorMessage: "Brainstorming failed. Please try again.",
        },
        storeAction: StoreAction.NONE,
      };
    }
  },
  label: "Brainstorming",
});
