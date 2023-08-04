/* eslint-disable react/prop-types */
const DataTabs = ({data,name}) => {
  return (
    <div className='text-muted mt-2' style={{ fontSize: '.9rem' }}>
      <span
        className='text-primary'
        style={{ fontWeight: '700', marginRight: '.3rem' }}
      >
        {name}:
      </span>
      {data}
    </div>
  );
};
export default DataTabs;
