import './list.css';
import Item from '../item/item';

function List ({riderList, addToRoster, removeFromRoster}) {
  const items = (riderList.length > 0) ? riderList.map(rider => <Item 
    key={rider.id}         
    rider={rider}
    addToRoster={addToRoster}
    removeFromRoster={removeFromRoster}
    />) : <p>no riders</p>
  return (
    <div>
      {items}
    </div>
  )
}

export default List;