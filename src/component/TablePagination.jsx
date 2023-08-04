/* eslint-disable react/prop-types */
import { Pagination } from 'react-bootstrap';

const TablePagination = ({ total, current, handleChange }) => {
  let item = [];
  if (current > 1)
    item.push(
      <Pagination.Prev key='prev' onClick={() => handleChange(current - 1)} />
    );

  for (let i = 1; i <= total; i++) {
    item.push(
      <Pagination.Item
        key={i}
        active={current === i}
        onClick={() => handleChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (current < total) {
    item.push(
      <Pagination.Next key='next' onClick={() => handleChange(current + 1)} />
    );
  }

  return <Pagination>{item}</Pagination>;
};
export default TablePagination;
