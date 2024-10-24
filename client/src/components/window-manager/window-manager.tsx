import React from "react";
import styled from "styled-components";
import {
  PiArrowSquareIn,
  PiArrowSquareOut,
  PiArrowSquareUpRightLight,
} from "react-icons/pi";
import { LiaShareSquare } from "react-icons/lia";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 5%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  overflow: hidden;
  background-color: #edeeef;
`;

const WindowTypeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const IconContainer = styled.div`
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WindowIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4rem;
  h5 {
    margin: 0;
    font-size: 0.8rem;
  }
`;
const handleDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  type: string
) => {
  const windowData = {
    type: type,
  };
  event.dataTransfer.setData("text/plain", JSON.stringify(windowData));
};

const WindowManager: React.FC = () => {
  return (
    <Container>
      <WindowTypeContainer>
        <WindowIconContainer>
          <IconContainer
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "source")}
          >
            <PiArrowSquareIn size={30} />
          </IconContainer>
          <h5>Source</h5>
        </WindowIconContainer>

        <WindowIconContainer>
          <IconContainer
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "compute")}
          >
            <PiArrowSquareUpRightLight size={30} />
          </IconContainer>
          <h5>Compute</h5>
        </WindowIconContainer>
        <WindowIconContainer>
          <IconContainer
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "action")}
          >
            <LiaShareSquare size={30} />
          </IconContainer>
          <h5>Action</h5>
        </WindowIconContainer>
        <WindowIconContainer>
          <IconContainer
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "output")}
          >
            <PiArrowSquareOut size={30} />
          </IconContainer>
          <h5>Output</h5>
        </WindowIconContainer>
      </WindowTypeContainer>
    </Container>
  );
};

export default WindowManager;
