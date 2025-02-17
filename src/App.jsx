import { useState, useEffect } from "react";
import AskForm from "./components/AskForm";
import ChatHistory from "./components/ChatHistory";
import "./App.css";

const App = () => {
  // State để lưu trữ lịch sử chat
  const [messages, setMessages] = useState([]);

  // Base URL của server đã được deploy trên Render
  const API_BASE_URL = "https://svgquery.onrender.com";

  // Hàm gọi API để lấy lịch sử chat từ server
  const fetchResponses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/responses`);
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu từ server");
      const data = await response.json();
      // Đảo ngược thứ tự tin nhắn để hiển thị câu trả lời mới nhất ở đầu
      setMessages(data.reverse());
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử chat:", error);
    }
  };

  // Gọi API để gửi câu hỏi và nhận câu trả lời
  const handleAskSubmit = async (question) => {
    // Thêm câu hỏi vào lịch sử chat với trạng thái đang xử lý
    const newMessage = { question, answer: "Đang xử lý..." };
    setMessages((prevMessages) => [newMessage, ...prevMessages]); // Thêm câu hỏi vào đầu danh sách

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Lỗi khi gửi câu hỏi");

      const data = await response.json();

      // Cập nhật câu trả lời vào lịch sử chat
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === 0 ? { ...msg, answer: data.answer } : msg // Chỉ cập nhật câu trả lời đầu tiên
        )
      );
    } catch (error) {
      console.error("Lỗi khi xử lý câu hỏi:", error);

      // Nếu có lỗi, cập nhật trạng thái lỗi vào câu trả lời
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === 0
            ? { ...msg, answer: "Có lỗi xảy ra khi xử lý câu hỏi." }
            : msg
        )
      );
    }
  };

  // Lấy lịch sử chat khi component được mount
  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Ứng dụng Chat với Gemini AI</h1>
      <AskForm onSubmit={handleAskSubmit} />
      <ChatHistory messages={messages} />
    </div>
  );
};

export default App;