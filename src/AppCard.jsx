import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { GitHub, ExternalLink, X } from 'react-feather';

// AppDataのインポートは変更なし
import AppData from './Data/AppData.json';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 50px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0; 
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 50px;
  }
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 200px;
    box-shadow: none;
    border: none;
    background-color: #ffffff00;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.primary {
    background-color: #000000;
    color: white;
    border: none;

    &:hover {
      background-color: #5f5f5f;
    }
  }

  &.secondary {
    background-color: white;
    color: #000000;
    border: 1px solid #000000;

    &:hover {
      background-color: #cacaca;
    }
  }

  span {
    position: relative;
    top: 2px;
  }

  svg {
    margin-right: 0.3rem; 
  }
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #989898;;
  display: block;
`;

const ModalContent = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
  }
`;

const TechBadge = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(0, 0, 0);
  margin-right: 1vh;
  margin-top: 1vh;
  padding: 0;
`;

export default function AppShowcase() {
  const [shuffledApps, setShuffledApps] = useState([]);
  const [shuffledSystems, setShuffledSystems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setShuffledApps(shuffleArray([...AppData.apps]));
    setShuffledSystems(shuffleArray([...AppData.systems]));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AppCard = ({ item, type }) => (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => openModal(item)}
    >
      <CardImage src={item.path} alt={item.name} />
      <CardContent>
        <Tag>{item.tag}</Tag>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.script}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="secondary">
          Details
        </Button>
        {type === 'app' ? (
          <a href={item.url}>
            <Button className="primary" target="_blank" rel="noopener noreferrer">
              Play
            </Button>
          </a>
        ) : (
          <a href={item.url || item.githuburl}>
            <Button className="primary" target="_blank" rel="noopener noreferrer">
              {item.url ? 'Play' : 'GitHub'}
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <h1 className="title">AppShowcase</h1>
      <Container>
        <section>
          <SectionTitle>Applications</SectionTitle>
          <Grid>
            {shuffledApps.map((app) => (
              <AppCard key={app.name} item={app} type="app" />
            ))}
          </Grid>
        </section>

        <section>
          <SectionTitle>Systems</SectionTitle>
          <Grid>
            {shuffledSystems.map((system) => (
              <AppCard key={system.name} item={system} type="system" />
            ))}
          </Grid>
        </section>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="App Details"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '500px',
              width: '90%',
            },
          }}
        >
          {selectedItem && (
            <ModalContent>
              <CloseButton onClick={closeModal}><X /></CloseButton>
              <Tag>{selectedItem.tag}</Tag>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.script}</p>
              <h4>Development Background:</h4>
              <p>{selectedItem.background}</p>
              <h4>Technologies Used:</h4>
              <div>
                {selectedItem.technology.split(" ").map((tech, index) => (
                  <TechBadge key={index}>{tech}</TechBadge>
                ))}
              </div>
              <ModalButtons>
                {selectedItem.githuburl && (
                  <a href={selectedItem.githuburl}>
                    <Button className="secondary" target="_blank" rel="noopener noreferrer">
                      <GitHub size={16} style={{ marginRight: '0.5rem' }} />
                      <span>GitHub</span>
                    </Button>
                  </a>
                )}
                {selectedItem.url && (
                  <a href={selectedItem.url}>
                    <Button className="primary" target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} style={{ marginRight: '0.5rem' }} />
                      <span>Play</span>
                    </Button>
                  </a>
                )}
              </ModalButtons>
            </ModalContent>
          )}
        </Modal>
      </Container>
    </div>
  );
}

