import "./ChatHistory.css";

const ChatHistory = ({ messages }) => { // Nhận messages từ props
  return (
    <div className="chat-container">
      <h2 className="chat-title">Lịch sử chat</h2>
      <div className="chat-messages">
        {messages.map((item, index) => (
          <div key={index} className="chat-message">
            <p className="user-question"><strong> Bạn👨‍💻:</strong> {item.question}</p>
            <p className="ai-answer"><strong> Gemini AI🤖:</strong> {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
