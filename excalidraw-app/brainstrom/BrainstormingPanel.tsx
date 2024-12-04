import React, { useEffect, useState, useCallback } from "react";
import { getOpenAIResponse } from "../../packages/utils/openai"; // Adjust the path based on your project structure
import "./BrainstormingPanel.scss";

interface BrainstormingPanelProps {
  contents: readonly any[]; // Define a more specific type if possible for contents
  handleClose: () => void;
}

export const BrainstormingPanel: React.FC<BrainstormingPanelProps> = ({
  contents,
  handleClose,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = useCallback(async () => {
    if (!contents) {
      console.error("Missing contents");
      return;
    }

    setLoading(true);
    const dataToExtract = contents.map((el: any) => ({
      type: el.type,
      text: el.text,
      id: el.id,
      width: el.width,
      height: el.height,
    }));

    const prompt = `Here is the data extracted from the Excalidraw whiteboard: ${JSON.stringify(
      dataToExtract,
    )}. Based on this, generate 3-4 brainstorming questions.`;

    const { questions: generatedQuestions } = await getOpenAIResponse(prompt);
    setQuestions(generatedQuestions);
  }, [contents]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click from propagating to parent elements
  };

  return (
    <div
      className="brainstorming-panel"
      onClick={handlePanelClick} // Prevent propagation of click event
    >
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
      <h2>Brainstorming Questions</h2>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
