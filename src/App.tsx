import Note from "./components/Note";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">Sidebar</div>
      <div className="content">
        <Note />
      </div>
    </div>
  );
}

export default App;
