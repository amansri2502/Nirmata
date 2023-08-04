/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Table,
  Container,
  Form,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import getPlayers from '../../constants/get-players';
import { calculateAgeInYears } from '../../constants/utils';
import getTypes from '../../constants/types';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import TablePagination from '../../component/TablePagination';

const Home = () => {
  const LIMIT = 10;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState(
    searchParams.get('type') || ''
  );
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortOrder, setSortOrder] = useState({});
  const [page, setPage] = useState(1);

  const onSelectedTypeChange = (item) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...(item && { type: item }),
        ...(searchParams.get('search') && {
          search: searchParams.get('search'),
        }),
      }).toString(),
    });
  };

  const onSearchChange = (item) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...(item && { search: item }),
        ...(searchParams.get('type') && { type: searchParams.get('type') }),
      }).toString(),
    });
  };

  const fetchData = async () => {
    const res = await getPlayers();
    return res;
  };

  const filterData = async () => {
    const players = await fetchData();
    let newData = [...players];
    if (selectedType) {
      newData = newData.filter((item) => item.type === selectedType);
    }
    if (search) {
      newData = newData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setData(newData);
    setSortOrder({});
    setPage(1);
  };

  const sorting = (col) => {
    console.log(sortOrder);
    if (sortOrder.name === col) {
      if (sortOrder.order === 'ASC') {
        const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
        setData(sorted);
        setSortOrder({ name: col, order: 'DSC' });
      } else {
        console.log('in');
        const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
        setData(sorted);
        setSortOrder({ name: col, order: 'ASC' });
      }
    } else {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setSortOrder({ name: col, order: 'DSC' });
    }
  };

  useEffect(() => {
    setSelectedType(searchParams.get('type') ? searchParams.get('type') : '');
  }, [searchParams]);

  useEffect(() => {
    filterData();
  }, [selectedType,search]);

  useEffect(() => {
    onSearchChange(search);
  }, [search]);

  return (
    <Container className='d-flex justify-content-center align-items-center mt-4'>
      <Card className='mt-3 col-lg-8 col-12' style={{ overflowX: 'auto' }}>
        <Card.Header className='d-flex justify-content-between'>
          <div>{"Player's Board🏏"}</div>
          <div className='d-flex gap-1'>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Form.Select
              size='sm'
              value={selectedType}
              onChange={(e) => onSelectedTypeChange(e.target.value)}
            >
              <option value=''>Select</option>
              {getTypes().map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <OverlayTrigger
                  placement='left'
                  overlay={
                    <Tooltip id='button-tooltip-2'>sort by name</Tooltip>
                  }
                >
                  <th
                    className='pointer'
                    scope='col'
                    onClick={() => sorting('name')}
                  >
                    Name
                  </th>
                </OverlayTrigger>
                <th scope='col'>Type</th>
                <th scope='col'>Points</th>
                <OverlayTrigger
                  placement='top'
                  overlay={
                    <Tooltip id='button-tooltip-2'>sort by rank</Tooltip>
                  }
                >
                  <th
                    className='pointer'
                    scope='col'
                    onClick={() => sorting('rank')}
                  >
                    Rank
                  </th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id='button-tooltip-2'>sort by age</Tooltip>}
                >
                  <th
                    className='pointer'
                    scope='col'
                    onClick={() => sorting('dob')}
                  >
                    Age
                  </th>
                </OverlayTrigger>
              </tr>
            </thead>
            <tbody>
              {data.slice((page - 1) * LIMIT, LIMIT * page).map((item) => (
                <tr key={item.id}>
                  <td
                    className='pointer text-decoration-underline text-primary'
                    onClick={() => navigate(`/${item.id}`)}
                  >
                    {item.name}
                  </td>
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
        <Card.Footer className='d-flex justify-content-center'>
          <TablePagination
            current={page}
            total={Math.ceil(data.length / LIMIT)}
            handleChange={(item) => setPage(item)}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};
export default Home;
