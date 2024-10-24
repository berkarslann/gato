import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";


const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BlackScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeOut} 1.5s ease forwards;
  animation-delay: 1.5s;
`;

const LogoImage = styled.img`
  width: 300px;
  height: 300px;
  opacity: 1; // Başlangıçta resim görünür olmalı
`;

const Container = styled.div`
  background-color: #14161c;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 3rem;
  overflow: hidden;
`;

const ShowcaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ShowcaseLineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40rem;
`;

const H1 = styled.h1`
  color: white;
  font-size: 5rem;
  margin: 0;
  font-family: "Montserrat", sans-serif;
`;

const H2 = styled.h2`
  font-size: 2rem;
  color: white;
  font-family: "Montserrat", sans-serif;
`;
const gradientAnimation = keyframes`  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }`;

const AnimatedH2 = styled.span`
  font-size: 2rem;
  background: linear-gradient(270deg, #ff6ec4, #7873f5, #4facfe);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 4s ease infinite;
  font-family: "Montserrat", sans-serif;
`;

const LoginV1Button = styled.button`
  font-family: "Montserrat", sans-serif;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 1.5rem;
  color: white;
  background: linear-gradient(90deg, #ff6ec4, #7873f5, #4facfe);
  background-size: 200% 200%;
  transition: background-position 0.5s ease;
  border-radius: 5%;
  &:hover {
    background-position: right center;
  }
`;

const HomePage: React.FC = () => {
  const [showInitialScreen, setShowInitialScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showInitialScreen && (
        <BlackScreen>
          <LogoImage src="/images/gato_img.png" alt="Gato Logo" />
        </BlackScreen>
      )}
      <Container>
        <ShowcaseContainer>
          <ShowcaseLineContainer>
            <H1>Gato</H1>
            <H2>
              Verileri İşlemek İçin <AnimatedH2>En İyi Yol</AnimatedH2>
            </H2>
            <LoginV1Button>Başla</LoginV1Button>
          </ShowcaseLineContainer>
        </ShowcaseContainer>
      </Container>
    </>
  );
};

export default HomePage;
