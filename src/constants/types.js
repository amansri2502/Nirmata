import data from './players';

const getTypes = () => {
    let allTypes = data.map(item => item.type)
    allTypes=allTypes.filter(item => item || false)
    return [...new Set(allTypes)];
}

export default getTypes