/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState } from "react";

const WhiteboardContext = createContext();

const WhiteboardContextProvider = ({ children }) => {

  const strokeColors = ["#1e1e1e", "#e03131", "#2f9e44", "#1971c2", "#f08c00"];
  const strokeWidths = [
    { strokeWidth: 2, divSize: 5 },
    { strokeWidth: 4, divSize: 7 },
    { strokeWidth: 6, divSize: 9 },
  ];
  const fontSizes = [
    { key: 'S', fontSize: 15 },
    { key: 'M', fontSize: 18 },
    { key: 'L', fontSize: 25 },
    { key: 'XL', fontSize: 30 },
  ];
  const fontFamilies = [
    {
      icon: (
        <svg id='0' className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
          />
        </svg>
      ),
      family: "",
    },
    {
      icon: (
        <svg id='1' className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 7a2 2 0 0 0-2 2v8h2v-4h2v4h2V9a2 2 0 0 0-2-2zm0 2h2v2h-2z"
          />
        </svg>
      ),
      family: "gilroy",
    },
    {
      icon: (
        <svg id='2' className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4.825 12.025L8.7 15.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T2.426 12q0-.2.063-.375T2.7 11.3l4.6-4.6q.3-.3.713-.3t.712.3q.3.3.3.713t-.3.712zm14.35-.05L15.3 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.3.3-.7.288t-.7-.313q-.3-.3-.3-.712t.3-.713z"
          />
        </svg>
      ),
      family: "Consolas",
    },
  ];
  const [element, setElement] = useState([]);
  const [stroke, setStroke] = useState("#1e1e1e");
  const [strokeWidth, setStrokeWidth] = useState({
    strokeWidth: 4,
    divSize: 7,
  });
  const [fontSize, setFontSize] = useState({
    fontSize: 15,
    key: "S",
  });
  const [fontFamily, setFontFamily] = useState({
    icon: (
      <svg
        className="w-5"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
        />
      </svg>
    ),
    family: "",
  });
  const [showSidebar,setShowSidebar] = useState(false);
  const [tool, setTool] = useState('null');
  const [history,setHistory] = useState([]);

  return (
    <WhiteboardContext.Provider
      value={{
        element,
        setElement,
        stroke,
        setStroke,
        tool,
        setTool,
        strokeColors,
        strokeWidth,
        setStrokeWidth,
        strokeWidths,
        showSidebar,
        setShowSidebar,
        history,
        setHistory,
        fontSizes,
        fontSize,
        setFontSize,
        fontFamilies,
        fontFamily,
        setFontFamily,
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
};

export const WhiteboardState = ()=> useContext(WhiteboardContext);

export default WhiteboardContextProvider;
