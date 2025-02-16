import { useState } from "react";
import "./AskForm.css";

const AskForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question) return;
    onSubmit(question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="ask-form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Hỏi Gemini AI..."
        className="ask-input"
      />
      <button type="submit" className="ask-button">Gửi</button>
    </form>
  );
};

export default AskForm;
