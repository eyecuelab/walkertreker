import React from 'react';
import StatDisplay_AllPlayers from './../../../ui/StatDisplay_AllPlayers';

function ItemsUsed(props) {
  
  const itemsUsed = ( player ) => {
    const items = props.campaign.inventories
    const itemsCount = items.reduce((acc, item) => {
      return item.userId === player.id ? acc + 1 : acc ; 
    }, 0);
    return itemsCount
  }

  return(
    <StatDisplay_AllPlayers title="Total Items Used" setValue={itemsUsed} />
  )
}

export default ItemsUsed;