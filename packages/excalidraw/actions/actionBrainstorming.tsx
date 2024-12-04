import { register } from "./register";
import { getHuggingFaceResponse } from "../../utils/openai"; // Your API integration
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

      console.log("Screen Content:", screenContent);

      if (!screenContent.trim()) {
        return {
          appState: {
            ...appState,
            errorMessage: "No content available for brainstorming.",
          },
          storeAction: StoreAction.NONE,
        };
      }

      // Prepare OpenAI prompt
      const prompt = `Based on the following content, generate 3-4 brainstorming questions:\n\n"${screenContent}"`;
      console.log("OpenAI Prompt:", prompt);

      // Get questions from OpenAI API
      const { questions } = await getHuggingFaceResponse(prompt);
      console.log("Questions from OpenAI:", questions);

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
