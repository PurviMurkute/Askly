import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const [recentQuery, setRecentQuery] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("CurrentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const formatText = (rawText) => {
    if (!rawText) return "";

    let formatted = rawText;

    // 1. Code blocks: ```
    formatted = formatted.replace(/```([\s\S]*?)```/g, (_, code) => {
      return `<pre class="bg-gray-900 text-white p-3 rounded my-4 whitespace-pre-wrap overflow-x-auto text-sm"><code>${code
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`;
    });

    // 2. Headings
    formatted = formatted.replace(
      /^###### (.*)$/gm,
      "<h6 class='text-md font-semibold my-2'>$1</h6>"
    );
    formatted = formatted.replace(
      /^##### (.*)$/gm,
      "<h5 class='text-lg font-semibold my-2'>$1</h5>"
    );
    formatted = formatted.replace(
      /^#### (.*)$/gm,
      "<h4 class='text-xl font-semibold my-2'>$1</h4>"
    );
    formatted = formatted.replace(
      /^### (.*)$/gm,
      "<h3 class='text-2xl font-bold my-2'>$1</h3>"
    );
    formatted = formatted.replace(
      /^## (.*)$/gm,
      "<h2 class='text-3xl font-bold my-2'>$1</h2>"
    );
    formatted = formatted.replace(
      /^# (.*)$/gm,
      "<h1 class='text-4xl font-bold my-2'>$1</h1>"
    );

    // 3. Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 4. Italic
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // 5. Remove lone asterisks that are not part of **bold** or *italic*
    // (not between alphanumeric chars)
    formatted = formatted.replace(/(^|\s)\*(\s|$)/g, "$1$2");

    // 6. Inline code: `code`
    formatted = formatted.replace(
      /`([^`\n]+)`/g,
      '<code class="bg-gray-700 text-white px-1 rounded">$1</code>'
    );

    // 7. Paragraphs (split on double newlines)
    formatted = formatted
      .split(/\n{2,}/)
      .map((para) => `<p class="my-2 leading-relaxed">${para.trim()}</p>`)
      .join("");

    return formatted;
  };

  const delayPara = (words, index = 0) => {
    if (index < words.length) {
      setTimeout(() => {
        setGeminiResponse((prev) => prev + words[index] + " ");
        delayPara(words, index + 1);
      }, 20);
    }
  };

  const handleQuestionClick = (queryText) => {
    setInput(queryText);
    setRecentQuery(queryText);
    generateResponse(queryText);
    setShowResult(true);
  };

  const generateResponse = async (queryText = input) => {
    if (!user) return;
    setLoader(true);
    setGeminiResponse("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/gemini`,
        {
          query: queryText,
          userId: user.sub,
        }
      );

      if (response.data.success) {
        const formattedText = formatText(response.data.data);
        const words = formattedText.split(" ");
        delayPara(words);

        toast.success(response.data.message);
        setInput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.message);
    } finally {
      setLoader(false);
    }
  };

  const contextValue = {
    user,
    setUser,
    input,
    setInput,
    geminiResponse,
    setGeminiResponse,
    showResult,
    setShowResult,
    loader,
    setLoader,
    recentQuery,
    setRecentQuery,
    formatText,
    delayPara,
    handleQuestionClick,
    generateResponse,
  };

  return (
    <context.Provider value={contextValue}>
      {children} <Toaster />
    </context.Provider>
  );
};

export { context, ContextProvider };
