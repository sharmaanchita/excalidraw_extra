import React, { useState } from "react";
import { UIAppState } from "../types"; // Adjust the path based on your project structure
import { ActionManager } from "../actions/manager"; 
import { Brainstorming } from "../actions/actionBrainstorming";
import "./BrainstormButton.scss"// Adjust the import based on your project structure

interface BrainstormButtonProps {
  title: string;
  isMobile: boolean;
  appState: UIAppState; // Receive appState as a prop
  actionManager: ActionManager; // Receive actionManager as a prop
}

const BrainstormButton: React.FC<BrainstormButtonProps> = ({
  title,
  isMobile,
  appState,
  actionManager,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleClick = async () => {
    try {
      // Execute the Brainstorming action using actionManager
      await actionManager.executeAction(Brainstorming);
      const generatedQuestions = appState.brainstormingQuestions || [];
      setQuestions(generatedQuestions);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Failed to execute Brainstorming action:", error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className={`brainstorm-button ${isMobile ? "mobile" : "desktop"}`}
        onClick={handleClick}
      >
        {title}
      </button>
      {dropdownVisible && questions.length > 0 && (
        <div className="dropdown">
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrainstormButton;
