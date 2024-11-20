import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrResources } from "react-icons/gr";
import { GoNorthStar } from "react-icons/go";
import { AiOutlineBranches } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import SourceWindow from "../SourceWindow/SourceWindow";
import ActionWindow from "../ActionWindow.tsx/ActionWindow";
import ComputeWindow from "../ComputeWindow/ComputeWindow";
import OutputWindow from "../OutputWindow/OutputWindow";
import {
  addNewWindow,
  getProjectWindows,
  updateWindow,
} from "../../service/window-service";
import {
  addNewLine,
  getProjectLines,
  updateLine,
} from "../../service/line-service";

const colorMapping: Record<string, string> = {
  source: "rgba(255, 165, 0, 0.7)",
  compute: "rgba(0, 60, 255, 0.7)",
  action: "rgba(255, 0, 0, 0.7)",
  output: "rgba(255, 255, 0, 0.7)",
};

const windowIconMapping: Record<string, JSX.Element> = {
  source: <GrResources />,
  compute: <GoNorthStar />,
  action: <AiOutlineBranches />,
  output: <IoDocumentTextOutline />,
};

export interface AppWindow {
  id: string;
  icon: string;
  windowType: string;
  xPosition: number;
  yPosition: number;
  project: {
    id: 1;
  };
  incomingLines?: Line[];
  outgoingLines?: Line[];
}
export interface Line {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  project: {
    id: 1;
  };
  startWindow: AppWindow;
  endWindow: AppWindow;
}
const DropArea = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  border: 2px dashed #aaa;
  background-color: white;
  background-image: radial-gradient(circle, #ddd 1px, transparent 1px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ContentArea = styled.div`
  transition: transform 0.3s ease;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const ConnectionPoint = styled.div<{ type: "top" | "bottom" }>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #666;
  cursor: pointer;
  transform: translate(-50%, -50%);
  left: 50%;
  top: ${(props) => (props.type === "top" ? 0 : "100%")};

  &:hover {
    background-color: #888;
  }
`;

const WindowContainer = styled.div<{ bgColor: string }>`
  position: absolute;
  width: 160px;
  height: 80px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const DeleteWindowButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: black;
  &:hover {
    color: #b00;
  }
`;

const WindowTypeIcon = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: black;
`;

const OperationArea = () => {
  const [zoom, setZoom] = useState(1);
  const [windowPool, setWindowPool] = useState<AppWindow[]>([]);
  const [selectedWindowId, setSelectedWindowId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [linePool, setLinePool] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectComponents = async () => {
      const projectWindows = await getProjectWindows(1);
      const projectLines = await getProjectLines(1);
      setWindowPool(projectWindows || []);
      setLinePool(projectLines || []);
    };

    fetchProjectComponents();
  }, []);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const scaleAmount = 0.1;
    const newZoom = e.deltaY < 0 ? zoom + scaleAmount : zoom - scaleAmount;
    if (newZoom >= 0.5 && newZoom <= 3) {
      setZoom(newZoom);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDeleteWindow = (id: string) => {
    setWindowPool((prevWindows) =>
      prevWindows.filter((window) => window.id !== id)
    );
    setLinePool((prevLines) =>
      prevLines.filter(
        (line) => line.startWindow.id !== id && line.endWindow.id !== id
      )
    );
    setTimeout(() => {
      setCurrentLine(null);
      document.body.style.cursor = "default";
    }, 100);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const parsedData = JSON.parse(data);
    const newWindow: AppWindow = {
      id: `${parsedData.type}-${Date.now()}`,
      icon: parsedData.type,
      windowType: parsedData.type,
      xPosition: e.clientX - e.currentTarget.getBoundingClientRect().left,
      yPosition: e.clientY - e.currentTarget.getBoundingClientRect().top,
      project: {
        id: 1,
      },
    };

    addNewWindow(newWindow);

    setWindowPool((prevWindows) => [...prevWindows, newWindow]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    setSelectedWindowId(id);

    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && currentLine) {
      setCurrentLine({
        ...currentLine,
        endX: e.clientX - e.currentTarget.getBoundingClientRect().left,
        endY: e.clientY - e.currentTarget.getBoundingClientRect().top,
      });
    }

    if (!dragging || selectedWindowId === null) return;

    const index = windowPool.findIndex((win) => win.id === selectedWindowId);
    if (index === -1) return;

    const updatedWindows = [...windowPool];
    const updatedWindow = {
      ...updatedWindows[index],
      xPosition: e.clientX - e.currentTarget.getBoundingClientRect().left,
      yPosition: e.clientY - e.currentTarget.getBoundingClientRect().top,
    };

    updatedWindows[index] = updatedWindow;

    setWindowPool(updatedWindows);
    // const updateIncomingLines = async () => {
    //   if (updatedWindow.incomingLines) {
    //     updatedWindow.incomingLines = await Promise.all(
    //       updatedWindow.incomingLines.map(async (line) => {
    //         const updatedLine = {
    //           ...line,
    //           startX: updatedWindow.xPosition + 80,
    //           startY: updatedWindow.yPosition + 80,
    //         };
    //         await updateLine(updatedLine); 
    //         return updatedLine; 
    //       })
    //     );
    //   }
    // };

    // updateIncomingLines().catch((error) => {
    //   console.error("Error updating lines:", error);
    // });

    // const updateOutgoingLines = async () => {
    //   if (updatedWindow.outgoingLines) {
    //     updatedWindow.outgoingLines = await Promise.all(
    //       updatedWindow.outgoingLines.map(async (line) => {
    //         const updatedLine = {
    //           ...line,
    //           endX: updatedWindow.xPosition + 80,
    //           endY: updatedWindow.yPosition,
    //         };
    //         await updateLine(updatedLine); 
    //         return updatedLine; 
    //       })
    //     );
    //   }
    // };

    // updateOutgoingLines().catch((error) => {
    //   console.error("Error updating outgoing lines:", error);
    // });


    setLinePool((prevLines) =>
      prevLines.map((line) => {
        if (line.startWindow?.id === selectedWindowId) {
          return {
            ...line,
            startX: updatedWindow.xPosition + 80,
            startY: updatedWindow.yPosition + 80,
          };
        } else if (line.endWindow?.id === selectedWindowId) {
          return {
            ...line,
            endX: updatedWindow.xPosition + 80,
            endY: updatedWindow.yPosition,
          };
        }
        return line;
      })
    );

    setTimeout(() => {
      setCurrentLine(null);
      document.body.style.cursor = "default";
    }, 100);
  };

  const handleMouseUp = () => {
    const updatedWindow = windowPool.find((win) => win.id === selectedWindowId);
    if (!updatedWindow) return;

    updateWindow(updatedWindow);

    setDragging(false);
  };

  const handleConnectStart = (
    window: AppWindow,
    type: "top" | "bottom",
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDrawing) {
      if (!window) return;

      const offset = type === "top" ? 0 : 80;

      const newLine: Line = {
        id: Math.random() * 1000000,
        startX: window.xPosition + 80,
        startY: window.yPosition + offset,
        endX: e.clientX,
        endY: e.clientY,
        startWindow: window,
        endWindow: window,
        project: {
          id: 1,
        },
      };

      setCurrentLine(newLine);

      setIsDrawing(true);
    }
  };

  const handleConnectEnd = (window: AppWindow, type: "top" | "bottom") => {
    if (isDrawing && currentLine && currentLine.startWindow.id !== window.id) {
      if (!window) return;

      const updatedLine = {
        ...currentLine,
        endWindow: window,
      };

      const duplicateLine = linePool.some(
        (line) =>
          line.startWindow?.id === updatedLine.startWindow.id &&
          line.endWindow?.id === updatedLine.endWindow.id
      );
      if (duplicateLine) {
        setIsDrawing(false);
        setCurrentLine(null);
        setTimeout(() => {
          setCurrentLine(null);
          document.body.style.cursor = "default";
        }, 100);

        return;
      }

      setCurrentLine(updatedLine);
      addNewLine(updatedLine);
      setIsDrawing(false);

      setLinePool((prevLines) => [...prevLines, updatedLine]);
      setCurrentLine(null);
    }
  };

  const handleWindowComponent = (windowType: string) => {
    setSelectedWindow(windowType);
  };

  const renderSelectedWindow = () => {
    switch (selectedWindow) {
      case "source":
        return <SourceWindow onClose={() => setSelectedWindow(null)} />;
      case "compute":
        return <ComputeWindow onClose={() => setSelectedWindow(null)} />;
      case "action":
        return <ActionWindow onClose={() => setSelectedWindow(null)} />;
      case "output":
        return <OutputWindow onClose={() => setSelectedWindow(null)} />;

      default:
        return null;
    }
  };

  return (
    <DropArea
      style={{ backgroundSize: `${20 / zoom}px ${20 / zoom}px` }}
      onWheel={handleWheel}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ContentArea style={{ transform: `scale(${zoom})` }}>
        {Array.isArray(windowPool) &&
          windowPool.map((window) => (
            <WindowContainer
              key={window.id}
              bgColor={colorMapping[window.icon] || "grey"}
              style={{
                left: window.xPosition,
                top: window.yPosition,
              }}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
              onClick={() => handleWindowComponent(window.windowType)}
            >
              <WindowTypeIcon>
                {windowIconMapping[window.windowType]}
              </WindowTypeIcon>
              <DeleteWindowButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteWindow(window.id);
                }}
              >
                X
              </DeleteWindowButton>
              <ConnectionPoint
                type="top"
                onMouseEnter={() => handleConnectEnd(window, "top")}
              />
              <ConnectionPoint
                type="bottom"
                onClick={(e) => {
                  e.stopPropagation();
                  handleConnectStart(window, "bottom", e);
                }}
              />
            </WindowContainer>
          ))}

        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>

          {linePool.map((line, index) => (
            <line
              key={index}
              x1={line.startX}
              y1={line.startY}
              x2={line.endX}
              y2={line.endY}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          ))}

          {currentLine && (
            <line
              x1={currentLine.startX}
              y1={currentLine.startY}
              x2={currentLine.endX}
              y2={currentLine.endY}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          )}
        </svg>
        {selectedWindow && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            {renderSelectedWindow()}
          </div>
        )}
      </ContentArea>
    </DropArea>
  );
};

export default OperationArea;
