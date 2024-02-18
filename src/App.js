import { Route, Routes } from "react-router-dom";
import MainComponent from "./Components/MainComponent"
import WelcomeScreen from "./Components/WelcomeScreen";
import Arena from "./Components/Arena";



function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/main" element={<MainComponent />} />
      <Route path="/arena" element={<Arena />} />
    </Routes>
  );
}

export default App;
