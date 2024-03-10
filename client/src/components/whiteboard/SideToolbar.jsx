import { WhiteboardState } from "../../context/WhiteboardContext";

const SideToolbar = () => {
  const {
    stroke,
    setStroke,
    strokeColors,
    strokeWidths,
    strokeWidth,
    setStrokeWidth,
    tool,
    fontSizes,
    setFontSize,
    fontSize,
    fontFamilies,
    fontFamily,
    setFontFamily,
  } = WhiteboardState();

  const handleClick = (e) => {
    const { id } = e.target;
    setStroke(() => strokeColors[id]);
  };
  const handleStrokeWidth = (e) => {
    const { id } = e.target;
    setStrokeWidth(() => strokeWidths[id]);
  };
  const handleFontSize= (e) => {
    const { id } = e.target;
    setFontSize(() => fontSizes[id]);
  };
  const handleFontFamily = (e) => {
    const { id } = e.target;
    setFontFamily(() => fontFamilies[id]);
  };

  return (
    <div className="fixed left-8 top-24 z-10 h-fit w-48 rounded-lg bg-slate-50 p-2 shadow-lg ">
      <p className="mb-2 text-sm">Stroke</p>
      <div className="mb-2 flex justify-between">
        {strokeColors?.map((color, id) => (
          <button
            key={id}
            id={id}
            onClick={handleClick}
            className={`${
              color == stroke ? "border-blue-600" : "border-transparent"
            } h-6 w-6 rounded-sm border-2 border-solid  p-px`}
          >
            <div
              id={id}
              className={`h-full w-full rounded-sm`}
              style={{ background: `${color}` }}
            ></div>
          </button>
        ))}
        <div className="flex h-6 w-8 items-center justify-center border-l-2 border-solid border-slate-800 ">
          <div
            className={`ml-2 h-[22px] w-[22px] rounded-sm`}
            style={{ background: `${stroke}` }}
          ></div>
        </div>
      </div>
      {tool != "text" ? (
        <>
          <p className="mb-2 text-sm">Stroke width</p>
          <div className="mb-2 flex justify-between">
            {strokeWidths?.map((obj, id) => (
              <button
                key={id}
                id={id}
                onClick={handleStrokeWidth}
                className={`${
                  obj.divSize == strokeWidth.divSize
                    ? "border-blue-600"
                    : "border-transparent"
                } flex h-6 w-6 items-center justify-center rounded-sm border-2 border-solid p-px`}
              >
                <div
                  id={id}
                  className={`rounded-full`}
                  style={{
                    backgroundColor: `${stroke}`,
                    width: `${obj.divSize}px`,
                    height: `${obj.divSize}px`,
                  }}
                ></div>
              </button>
            ))}
            <div className="flex h-6 w-8 items-center justify-center border-l-2 border-solid border-slate-800 ">
              <div
                className={`ml-2 flex h-[22px]  w-[22px] items-center justify-center rounded-sm`}
              >
                <div
                  className={`rounded-full bg-black`}
                  style={{
                    width: `${strokeWidth.divSize}px`,
                    height: `${strokeWidth.divSize}px`,
                    backgroundColor: `${stroke}`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm">Font Size</p>
          <div className="mb-2 flex justify-between">
            {fontSizes?.map((obj, id) => (
              <button
                key={id}
                id={id}
                onClick={handleFontSize}
                className={`${
                  obj.key == fontSize.key
                    ? "border-blue-600 text-blue-800"
                    : "border-transparent"
                } flex h-6 w-6 items-center justify-center rounded-md border-2 border-solid bg-slate-200 p-3`}
              >
                <p id={id}>{obj.key}</p>
              </button>
            ))}
          </div>
          <p className="mb-2 text-sm">Font Family</p>
          <div className="mb-2 flex gap-3">
            {fontFamilies?.map((obj, id) => (
              <button
                key={id}
                id={id}
                onClick={handleFontFamily}
                className={`${
                  obj.family == fontFamily.family
                    ? "border-blue-600 text-blue-800"
                    : "border-transparent"
                } flex h-6 w-6 items-center justify-center rounded-md border-2 border-solid bg-slate-200 p-3`}
              >
                {/* <p id={id}>{obj.key}</p> */}
                <div id={id}>{obj.icon}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SideToolbar;
