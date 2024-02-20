import { Navigate, Route, Routes } from "react-router-dom";
import MainComponent from "./Components/MainComponent"
import WelcomeScreen from "./Components/WelcomeScreen";
import Arena from "./Components/Arena";



function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/main" element={<MainComponent />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
