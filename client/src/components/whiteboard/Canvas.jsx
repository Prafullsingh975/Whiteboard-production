/* eslint-disable react/prop-types */
import { useLayoutEffect, useEffect, useState } from "react";
import rough from "roughjs";
import { WhiteboardState } from "../../context/WhiteboardContext";
import { userState } from "../../context/UserContext";
import { useSocket } from "../../context/SocketContext";
// const roughGenerator = rough.generator();
const Canvas = ({ canvasRef, ctxRef }) => {
  const {
    element,
    setElement,
    stroke,
    tool,
    strokeWidth,
    fontSize,
    fontFamily,
  } = WhiteboardState();

  const { host } = userState();
  const [isDrawing, setDrawing] = useState(false);
  const {socket} = useSocket();
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (element.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }

    element.forEach((elm) => {
      elm.tool == "pencil" &&
        roughCanvas.linearPath(elm.path, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
      if (elm.tool == "arrow") {
        roughCanvas.line(elm.x1, elm.y1, elm.x2, elm.y2, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
        //Drawing Arrow Head
        const arrowHeadSize = 10;
        const angle = Math.atan2(elm.y2 - elm.y1, elm.x2 - elm.x1);
        const arrowX = elm.x2 - Math.cos(angle) * arrowHeadSize;
        const arrowY = elm.y2 - Math.sin(angle) * arrowHeadSize;

        roughCanvas.polygon(
          [
            [elm.x2, elm.y2],
            [
              arrowX + Math.cos(angle + Math.PI / 2) * arrowHeadSize,
              arrowY + Math.sin(angle + Math.PI / 2) * arrowHeadSize,
            ],
            [
              arrowX + Math.cos(angle - Math.PI / 2) * arrowHeadSize,
              arrowY + Math.sin(angle - Math.PI / 2) * arrowHeadSize,
            ],
          ],
          {
            roughness: 0,
            stroke: elm.stroke,
            strokeWidth: elm.strokeWidth,
            fill: elm.stroke,
            fillStyle: "solid",
          },
        );
      }
      elm.tool == "line" &&
        roughCanvas.line(elm.x1, elm.y1, elm.x2, elm.y2, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
      elm.tool == "rectangle" &&
        roughCanvas.rectangle(elm.x1, elm.y1, elm.x2, elm.y2, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
      elm.tool == "circle" &&
        roughCanvas.circle(elm.x, elm.y, elm.diameter, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
      elm.tool == "ellipse" &&
        roughCanvas.ellipse(elm.x, elm.y, elm.x2, elm.y2, {
          roughness: 0,
          stroke: elm.stroke,
          strokeWidth: elm.strokeWidth,
        });
      if (elm.tool == "text") {
        ctxRef.fillText(elm.text, elm.x, elm.y);
      }
    });

    //Sending Data to other user 
    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData",{canvasImage,roomId:host.roomId});
  }, [element]);
  
  // Setting Canvas Size
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    const resizeCanvas = () => {
      // const { y, x } = canvas.getBoundingClientRect();
      const height = window.innerHeight;
      const width = window.innerWidth;
      canvas.height = height;
      canvas.width = width;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }, []);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    tool == "pencil" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          stroke,
          roughness: 0,
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    tool == "arrow" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          stroke,
          roughness: 0,
          x1: offsetX,
          y1: offsetY,
          x2: offsetX,
          y2: offsetY,
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    tool == "line" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          stroke,
          roughness: 0,
          x1: offsetX,
          y1: offsetY,
          x2: offsetX,
          y2: offsetY,
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    tool == "rectangle" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          stroke,
          roughness: 0,
          x1: offsetX,
          y1: offsetY,
          x2: 0,
          y2: 0,
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    tool == "circle" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          stroke,
          roughness: 0,
          x: offsetX,
          y: offsetY,
          diameter: 0,
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    tool == "ellipse" &&
      setElement((pre) => [
        ...pre,
        {
          tool,
          fillStyle: stroke,
          x: offsetX,
          y: offsetY,
          strokeWidth: strokeWidth.strokeWidth,
        },
      ]);
    if (tool == "text") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // ctx.font("30px Great Vibes");
      ctx.font = `${fontSize.fontSize}px ${fontFamily.family}`;
      ctx.fillStyle = stroke;
      ctx.fillText("Hello", offsetX, offsetY + 15);
      //   setElement((pre) => [
      //   ...pre,
      //   {
      //     tool,
      //     stroke,
      //     roughness: 0,
      //     x:offsetX,
      //     y:offsetY,
      //     x2:0,
      //     y2:0,
      //     strokeWidth: strokeWidth.strokeWidth,
      //   },
      // ]);
      //   console.log("Hello");
      // }
    }
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool == "pencil") {
        const { path } = element[element.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                path: newPath,
              };
            } else return elm;
          });
        });
      } else if (tool == "arrow") {
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                x2: offsetX,
                y2: offsetY,
              };
            } else return elm;
          });
        });
      } else if (tool == "line") {
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                x2: offsetX,
                y2: offsetY,
              };
            } else return elm;
          });
        });
      } else if (tool == "rectangle") {
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                x2: offsetX - elm.x1,
                y2: offsetY - elm.y1,
              };
            } else return elm;
          });
        });
      } else if (tool == "circle") {
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                diameter: offsetX - elm.x,
              };
            } else return elm;
          });
        });
      } else if (tool == "ellipse") {
        setElement((pre) => {
          return pre.map((elm, idx) => {
            if (idx == element.length - 1) {
              return {
                ...elm,
                x2: offsetX - elm.x,
                y2: offsetY - elm.y,
              };
            } else return elm;
          });
        });
      }
    }
  };

  const handleMouseUP = () => {
    setDrawing(false);
  };

  return (
    <>
      <canvas
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUP}
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        id="canvas"
        className="fixed left-0 top-0 z-0 h-full w-full"
      ></canvas>
    </>
  );
};

export default Canvas;
