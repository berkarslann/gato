import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrResources } from "react-icons/gr";
import { GoNorthStar } from "react-icons/go";
import { AiOutlineBranches } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";

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

interface Window {
  id: string;
  icon: string;
  windowType: string;
  xPosition: number;
  yPosition: number;
  connections: Array<{ id: string; type: "start" | "end" }>;
}
interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startWindowId: string;
  endWindowId?: string;
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
  const [windowPool, setWindowPool] = useState<Window[]>([]);
  const [selectedWindowId, setSelectedWindowId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [linePool, setLinePool] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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
        (line) => line.startWindowId !== id && line.endWindowId !== id
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
    const newWindow: Window = {
      id: `${parsedData.type}-${Date.now()}`,
      icon: parsedData.type,
      windowType: parsedData.type,
      xPosition: e.clientX - e.currentTarget.getBoundingClientRect().left,
      yPosition: e.clientY - e.currentTarget.getBoundingClientRect().top,
      connections: [],
    };
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

    setLinePool((prevLines) =>
      prevLines.map((line) => {
        if (line.startWindowId === selectedWindowId) {
          return {
            ...line,
            startX: updatedWindow.xPosition + 80,
            startY: updatedWindow.yPosition + 80,
          };
        } else if (line.endWindowId === selectedWindowId) {
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
    setDragging(false);
  };

  useEffect(() => {
    console.log(linePool);
  }, [linePool]);
  const handleConnectStart = (
    windowId: string,
    type: "top" | "bottom",
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDrawing) {
      const window = windowPool.find((w) => w.id === windowId);
      if (!window) return;

      const offset = type === "top" ? 0 : 80;

      const newLine: Line = {
        startX: window.xPosition + 80,
        startY: window.yPosition + offset,
        endX: e.clientX,
        endY: e.clientY,
        startWindowId: windowId,
      };

      setCurrentLine(newLine);

      setIsDrawing(true);
    }
  };

  const handleConnectEnd = (windowId: string, type: "top" | "bottom") => {
    if (isDrawing && currentLine && currentLine.startWindowId !== windowId) {
      const window = windowPool.find((w) => w.id === windowId);
      if (!window) return;

      const updatedLine = {
        ...currentLine,
        endWindowId: windowId,
      };

      const duplicateLine = linePool.some(
        (line) =>
          line.startWindowId === updatedLine.startWindowId &&
          line.endWindowId === updatedLine.endWindowId
      );
      console.log(duplicateLine);
      if (duplicateLine) {
        console.log("Duplicate line detected, not adding to linePool.");
        setIsDrawing(false);
        setCurrentLine(null);
        setTimeout(() => {
          setCurrentLine(null);
          document.body.style.cursor = "default";
        }, 100);

        return;
      }

      setCurrentLine(updatedLine);
      setIsDrawing(false);

      setLinePool((prevLines) => [...prevLines, updatedLine]);
      console.log("Line added to linePool:", updatedLine);
      console.log(linePool);
      setCurrentLine(null);
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
        {windowPool.map((window) => (
          <WindowContainer
            key={window.id}
            bgColor={colorMapping[window.icon] || "grey"}
            style={{
              left: window.xPosition,
              top: window.yPosition,
            }}
            onMouseDown={(e) => handleMouseDown(e, window.id)}
          >
            <WindowTypeIcon>
              {windowIconMapping[window.windowType]}
            </WindowTypeIcon>
            <DeleteWindowButton onClick={() => handleDeleteWindow(window.id)}>
              X
            </DeleteWindowButton>
            <ConnectionPoint
              type="top"
              onMouseEnter={() => handleConnectEnd(window.id, "top")}
            />
            <ConnectionPoint
              type="bottom"
              onClick={(e) => handleConnectStart(window.id, "bottom", e)}
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
      </ContentArea>
    </DropArea>
  );
};

export default OperationArea;
