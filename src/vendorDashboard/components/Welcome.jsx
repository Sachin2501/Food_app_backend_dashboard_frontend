import React from 'react'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")

  return (
    <div className='welcomeSection'>
        <h2>Welcome <br/> {firmName}</h2>
        <div className="landingImage">
          <img src='/assets/del.gif' alt='welcome'  width='75%'/>
        </div>
    </div>
  )
}

export default Welcome