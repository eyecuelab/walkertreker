import React from 'react';
import StatDisplay from './../../../ui/StatDisplay';

function WeaponsUsed(props) {
  
  const weaponsUsed = ( ) => {

    const items = props.campaign.inventories
    const weaponsUsed = items.reduce((acc, item) => {
      return item.itemType === 'weapon' && item.user !== 'event' && item.used === true ? acc + 1 : acc ; 
    }, 0);
    
    return [{value: weaponsUsed, label: 'Weapons'}]
  }
  const data = weaponsUsed()

  return(
    <StatDisplay title="Weapons Used Againt Zombies" data={data} />
  )
}

export default WeaponsUsed;