import './list.scss';
import Item from '../item/item';

function List ({mine, riderList, addToRoster, removeFromRoster}) {
  const class_name = mine? 'myList' : 'fullList';
  const riders = (riderList && riderList.length > 0) ? riderList.map(rider => <Item 
    mine={mine}
    key={rider.id}         
    rider={rider}
    addToRoster={addToRoster}
    removeFromRoster={removeFromRoster}
    />) : 'no riders...';
  
  return (
    <div className={class_name}>
      {riders}
    </div>
  )
}

export default List;