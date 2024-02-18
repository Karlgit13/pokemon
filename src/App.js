import { Route, Routes } from "react-router-dom";
import MainComponent from "./Components/MainComponent"
import WelcomeScreen from "./Components/WelcomeScreen";



function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/main" element={<MainComponent />} />
    </Routes>
  );
}

export default App;
