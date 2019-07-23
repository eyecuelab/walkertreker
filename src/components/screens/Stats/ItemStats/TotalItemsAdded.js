import React from 'react';
import StatDisplay_AllPlayers from './../../../ui/StatDisplay_AllPlayers';

function ItemsAdded(props) {
  
  const itemsAdded = ( player ) => {
    const items = props.campaign.inventories
    const itemsCount = items.reduce((acc, item) => {
      return item.addedById === player.id ? acc + 1 : acc ; 
    }, 0);
    return itemsCount
  }

  return(
    <StatDisplay_AllPlayers title="Total Items Gathered" setValue={itemsAdded} />
  )
}

export default ItemsAdded;