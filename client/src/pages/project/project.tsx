import React from "react";
import styled from "styled-components";
import WindowManager from "../../components/window-manager/window-manager";
import Navigation from "../../components/navigation/navigation";
import OperationArea from "../../components/operation-area/operation-area";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  position: sticky;
`;
const ProjectPage: React.FC = () => {
  return (
    <Container>
      <Navigation />
      <MainContainer>
        <WindowManager />
        <OperationArea />
      </MainContainer>
    </Container>
  );
};

export default ProjectPage;
