import './list.scss';
import Item from '../item/item';

function List ({user, mine, riderList, addToRoster, removeFromRoster, userData, booleanObj, setBooleanObj}) {
  const class_name = mine? 'myList' : 'fullList';
  const riders = (riderList && riderList.length > 0) ? riderList.sort((r1, r2) => r2.price - r1.price).map(rider => <Item 
    mine={mine}
    key={rider.id}         
    rider={rider}
    addToRoster={addToRoster}
    removeFromRoster={removeFromRoster}
    user={user}
    userData={userData}
    booleanObj={booleanObj}
    setBooleanObj={setBooleanObj}
    />) : 'no riders...';
  
  return (
    <div className={class_name}>
      {riders}
    </div>
  )
}

export default List;