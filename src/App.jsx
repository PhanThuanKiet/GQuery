import { useState, useEffect } from "react";
import AskForm from "./components/AskForm";
import ChatHistory from "./components/ChatHistory";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);

  // Load lịch sử chat khi mở trang
  useEffect(() => {
    fetch("http://localhost:5000/responses")
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse())) // Đảo ngược lịch sử để câu mới nhất lên đầu
      .catch((err) => console.error(err));
  }, []);

  // Gửi câu hỏi và cập nhật ngay lập tức
  const handleQuestionSubmit = async (question) => {
    const newMessage = { question, answer: "Đang chờ AI trả lời..." };
    setMessages([newMessage, ...messages]); // Thêm vào đầu danh sách

    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setMessages([{ question, answer: data.answer }, ...messages]); // Cập nhật với câu trả lời lên đầu
  };

  return (
    <div className="app-container">
      <AskForm onSubmit={handleQuestionSubmit} />
      <ChatHistory messages={messages} /> {/* Truyền messages vào ChatHistory */}
    </div>
  );
};

export default App;
