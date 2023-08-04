/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import getPlayers from '../../constants/get-players';
import { useEffect, useState } from 'react';
import { calculateAgeInYears } from '../../constants/utils';
import DataTabs from '../../component/DataTabs';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [similarPlayer, setSimilarPlayers] = useState([]);

  const fetchDetailsPageData = async () => {
    const data = await getPlayers();
    const player = data.find((item) => item.id === id);
    if (!player) {
      navigate('/');
    } else {
      setSelectedPlayer(player);
      setSimilarPlayers(
        data.filter((item) => item.type === player.type && item.id !== id)
      );
    }
  };

  useEffect(() => {
    fetchDetailsPageData();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col className='d-flex align-items-center' style={{ height: '10vh' }}>
          <Button onClick={() => navigate(-1)} variant='danger'>
            Back
          </Button>
        </Col>
      </Row>
      <div>
        <Row>
          <Col className='col-lg-6'>
            <Card style={{ minHeight: '30vh' }}>
              <Card.Body>
                <div>
                  <div style={{ fontSize: '1.2rem' }}>
                    {selectedPlayer.name}
                  </div>
                  <div style={{ fontSize: '.8rem', textTransform: 'capitalize' }}>
                    {selectedPlayer.type}
                  </div>
                  <div className='mt-2'>
                    <div style={{ fontSize: '.9rem' }} className='text-muted'>
                      {selectedPlayer.description}
                    </div>
                    <div className='d-flex mt-2 gap-3'>
                      <DataTabs name={' DOB'} data={`${new Date(selectedPlayer.dob).toLocaleDateString()}`} />
                      <DataTabs name={'Age'} data={calculateAgeInYears(selectedPlayer.dob)} />
                      <DataTabs name={'Rank'} data={selectedPlayer.rank} />
                      <DataTabs name={'Point'} data={selectedPlayer.points} />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='mt-4 d-flex flex-wrap'>
          {similarPlayer.map((item, index) => (
            <Col
              key={index}
              className='col-lg-3 col-12 mt-3 mb-2 pointer'
              onClick={() => navigate(`/${item.id}`)}
            >
              <Card style={{ height: '15vh' }}>
                <Card.Body>
                  <div>{item.name}</div>
                  <div className='d-flex gap-3'>
                    <DataTabs name={'Rank'} data={item.rank} />
                    <DataTabs name={'Point'} data={item.points} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};
export default Details;
