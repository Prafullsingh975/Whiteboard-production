/* eslint-disable react/prop-types */
import { WhiteboardState } from "../../context/WhiteboardContext";

const Toolbar = ({ ctxRef, canvasRef }) => {
  const {
    tool,
    setTool,
    setShowSidebar,
    setElement,
    history,
    setHistory,
    element,
  } = WhiteboardState();
  return (
    <div className="fixed left-1/2 top-8 z-10 flex h-12 w-[45%] -translate-x-1/2 items-center justify-around rounded-md bg-slate-50 shadow-lg">
      {tool === "rectangle" ? (
        <button
          title="Rectangle"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Rectangle"
          onClick={() => {
            setTool("rectangle");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V6H4zm0 0V6z"
            />
          </svg>
        </button>
      )}
      {tool === "diamond" ? (
        <button
          title="Diamond"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098z"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Diamond"
          onClick={() => {
            setTool("diamond");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"
            />
          </svg>
        </button>
      )}
      {tool === "ellipse" ? (
        <button
          title="Ellipse"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 4C6.5 4 2 7.58 2 12s4.5 8 10 8s10-3.58 10-8s-4.5-8-10-8"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Ellipse"
          onClick={() => {
            setTool("ellipse");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 6c4.41 0 8 2.69 8 6s-3.59 6-8 6s-8-2.69-8-6s3.59-6 8-6m0-2C6.5 4 2 7.58 2 12s4.5 8 10 8s10-3.58 10-8s-4.5-8-10-8"
            />
          </svg>
        </button>
      )}
      {tool === "circle" ? (
        <button
          title="Circle"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Circle"
          onClick={() => {
            setTool("circle");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
            />
          </svg>
        </button>
      )}
      {tool === "arrow" ? (
        <button
          title="Arrow"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Arrow"
          onClick={() => {
            setTool("arrow");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
            />
          </svg>
        </button>
      )}
      {tool === "line" ? (
        <button
          title="Line"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2 9.75A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Line"
          onClick={() => {
            setTool("line");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2 9.75A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75"
            />
          </svg>
        </button>
      )}
      {tool === "pencil" ? (
        <button
          title="Pencil"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Pencil"
          onClick={() => {
            setTool("pencil");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
            />
          </svg>
        </button>
      )}
      {tool === "text" ? (
        <button
          title="Text"
          onClick={() => {
            setTool(null);
            setShowSidebar(false);
          }}
          className="h-full rounded-md bg-blue-200 p-1.5"
        >
          <svg
            className="text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 3c-.82 0-1.56.5-1.86 1.27l-5.5 14C3.12 19.58 4.09 21 5.5 21h2.25c.84 0 1.58-.5 1.87-1.3l.64-1.7h3.48l.64 1.7c.29.8 1.04 1.3 1.87 1.3h2.25c1.41 0 2.38-1.42 1.86-2.73l-5.5-14C14.56 3.5 13.82 3 13 3m-2 2h2l5.5 14h-2.25l-1.13-3H8.87l-1.12 3H5.5M12 7.67L9.62 14h4.75Z"
            />
          </svg>
        </button>
      ) : (
        <button
          title="Text"
          onClick={() => {
            setTool("text");
            setShowSidebar(true);
          }}
          className="h-full rounded-md p-1.5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 3c-.82 0-1.56.5-1.86 1.27l-5.5 14C3.12 19.58 4.09 21 5.5 21h2.25c.84 0 1.58-.5 1.87-1.3l.64-1.7h3.48l.64 1.7c.29.8 1.04 1.3 1.87 1.3h2.25c1.41 0 2.38-1.42 1.86-2.73l-5.5-14C14.56 3.5 13.82 3 13 3m-2 2h2l5.5 14h-2.25l-1.13-3H8.87l-1.12 3H5.5M12 7.67L9.62 14h4.75Z"
            />
          </svg>
        </button>
      )}
      <button
        title="Undo"
        onClick={() => {
          // setTool(null);
          // setShowSidebar(false);
          if(element.length > 0){
            setHistory((pre) => [...pre, element[element.length - 1]]);
            setElement((pre) => {
              return pre.filter((elm, idx) => idx != element.length - 1);
            });
          }
        }}
        className="h-full rounded-md p-1.5 active:bg-blue-200"
      >
        <svg
          className="active:text-blue-800"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 19v-2h7.1q1.575 0 2.738-1T18 13.5q0-1.5-1.162-2.5T14.1 10H7.8l2.6 2.6L9 14L4 9l5-5l1.4 1.4L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5q0 2.35-1.737 3.925T14.1 19z"
          />
        </svg>
      </button>
      <button
        title="Redo"
        onClick={() => {
          // setTool(null);
          // setShowSidebar(false);
          if (history.length > 0) {
            setElement((pre) => [...pre, history[history.length - 1]]);
            setHistory((pre) => {
              return pre.filter((elm, idx) => idx != history.length - 1);
            });
          }
        }}
        className="h-full rounded-md p-1.5 active:bg-blue-200"
      >
        <svg
          className="active:text-blue-800"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.9 19q-2.425 0-4.163-1.575T4 13.5q0-2.35 1.738-3.925T9.9 8h6.3l-2.6-2.6L15 4l5 5l-5 5l-1.4-1.4l2.6-2.6H9.9q-1.575 0-2.738 1T6 13.5Q6 15 7.163 16T9.9 17H17v2z"
          />
        </svg>
      </button>
      <button
        title="Clear"
        onClick={() => {
          setTool(null);
          setShowSidebar(false);
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          ctx.fillRect = "white";
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          setElement([]);
        }}
        className="h-full rounded-md p-1.5 font-semibold active:bg-blue-200 active:text-blue-800"
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
