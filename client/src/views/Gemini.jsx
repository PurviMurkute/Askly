import SideBar from "../components/SideBar";
import GeminiSection from "./../components/GeminiSection";

const Gemini = () => {
  return (
    <div className="flex fixed inset-0">
      <SideBar />
      <GeminiSection/>
    </div>
  );
};

export default Gemini;
