import React, { useState } from "react";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, #ff6ec4, #7873f5, #4facfe);
  position: sticky;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
`;

const PanelButton = styled.button`
  background-color: #282c34;
  color: white;
  border: none;
  margin-top: 4rem;
  margin-right: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background-color: #3c4049;
  }
`;

const Panel = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 15px;
  border-radius: 8px;
  position: absolute; /* NavBar'ın altında görünmesi için absolute konumlandırma */
  right: 20px; /* Panelin butonla hizalanması için sağa hizalama */
  top: 8rem; /* Panelin, butonun hemen altında görünmesi için üstten boşluk */
  width: 300px;
  z-index: 999; /* Üstte görünmesi için z-index ayarı */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ProfilePanel = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 15px;
  border-radius: 8px;
  position: absolute; /* NavBar'ın altında görünmesi için absolute konumlandırma */
  left: 20px; /* Panelin butonla hizalanması için sağa hizalama */
  top: 8rem; /* Panelin, butonun hemen altında görünmesi için üstten boşluk */
  width: 300px;
  height:100px;
  z-index: 999; /* Üstte görünmesi için z-index ayarı */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 4rem;
  margin-left: 0.7rem;
`;

const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px; // Resmin yüksekliği
  border-radius: 50%; // Yuvarlak köşeler için
  object-fit: cover; // Resmin boyutlarını koruyarak kapsayıcıya sığdır
  border: 2px solid transparent; // Başlangıçta sınırı saydam yap
  transition: border-color 0.3s ease; // Sınır rengi değişiminde animasyon

  &:hover {
    border-color: #fff; // Hover durumunda sınır rengini beyaza çevir
  }
`;

const Navigation: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleProfilePanel = ()=>{
    setIsProfilePanelOpen(!isProfilePanelOpen)
  }

  return (
    <NavBar>
      <ProfileSection>
        <ProfilePhoto src="https://picsum.photos/id/237/200/300" onClick={toggleProfilePanel}/>{" "}
      </ProfileSection>
      <PanelButton onClick={togglePanel}>Panel</PanelButton>
      {isProfilePanelOpen && (
        <ProfilePanel></ProfilePanel>
      )}
      {isPanelOpen && (
        <Panel>
          <h2>Panel İçeriği</h2>
          <p>Bu, açılan panelin içeriği.</p>
        </Panel>
      )}
    </NavBar>
  );
};

export default Navigation;
