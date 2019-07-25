import React from 'react';
import StatDisplay from './../../../ui/StatDisplay';

function EventItems(props) {
  
  const eventItems = ( ) => {
    const items = props.campaign.inventories
    const eventAdded = items.reduce((acc, item) => {
      return item.source === 'event' ? acc + 1 : acc ; 
    }, 0);
    const eventUsed = items.reduce((acc, item) => {
      return item.user === 'event' ? acc + 1 : acc ; 
    }, 0);
    return [{value: eventAdded, label: 'Rewards'} , {value: eventUsed, label: 'Lost'}]
  }
  const data = eventItems()

  return(
    <StatDisplay title="Items from Events" data={data} />
  )
}

export default EventItems;