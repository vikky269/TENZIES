import React from 'react'

const Die = (props) => {

    const styles = {
       backgroundColor: props.isheld ? "#59E391" : "white"
      
    }

    const renderDots = () => {
        const dots = []
        for (let i = 0; i < props.value; i++) {
          dots.push(<div className="dot" key={i}></div>)
        }
        return dots
      }
    


  return (
    <>
    <div 
    onClick={props.holdDice}
    className='die-face' 
    style={styles}>
        <h2 className='die-num'>{renderDots()}</h2>
    </div>
    </>
    
  )
}

export default Die