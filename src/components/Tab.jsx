import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'


const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state)

  const activeStyles = isFilterTab && isActiveTab ? { backgroundColor: snap.color, opacity: 0.5 } : { backgroundColor: 'transparent', opacity: 1 }
  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'} ${tab.name === 'purchaseModel' ? 'sm:w-16 sm:h-16 w-10 h-10 bg-blue-500/30 border-2 border-blue-400' : ''
        }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab
          ? (tab.name === 'purchaseModel' ? 'w-full h-full object-contain' : 'w-2/3 h-2/3')
          : 'w-11/12 h-11/12 object-contain'
          }`}
      />
    </div>
  )
}

export default Tab
