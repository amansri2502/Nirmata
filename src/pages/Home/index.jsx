import { Card, Table, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import getPlayers from '../../constants/get-players';
import { calculateAgeInYears } from '../../constants/utils';

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getPlayers();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Card className='mt-3' style={{ minWidth: '600px', overflowX: 'auto' }}>
        <Card.Header>
          <div>{"Player's Board🏏"}</div>
        </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Type</th>
                <th scope='col'>Points</th>
                <th scope='col'>Rank</th>
                <th scope='col'>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {item.type || '---'}
                  </td>
                  <td>{item.points}</td>
                  <td>{item.rank}</td>
                  <td>{calculateAgeInYears(item.dob)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Home;
