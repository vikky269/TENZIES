import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  function generateNewDie(){
    return  { 
      value: Math.ceil(Math.random() * 6),
       isheld:false,
       id: nanoid()
      }
  }



  const allnewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  
   const rolldice = ()=> {
    
    if(!tenzies){
      setdice(oldDice => oldDice.map(die => {
        return(
          die.isheld?
          die :
          generateNewDie()
        )
      }))
    } else{
      settenzies(false)
      setdice(allnewDice())
      setrolls(-1)
    }
    setrolls((prevRolls) => prevRolls + 1)
    }

  const holdDice = (id)=>{
   setdice(oldDice => oldDice.map(die => {
    return(
      die.id===id ?
      {...die, isheld: !die.isheld}:
      die
    )
   }) )
  }

  const [dice, setdice] = useState(allnewDice())
  const [tenzies, settenzies] = useState(false)
  const [rolls, setrolls] = useState(0)

  useEffect( ()=> {
    const allheld = dice.every(die => die.isheld)
    const firstvalue = dice[0].value
    const allsamevalue = dice.every( die => die.value===firstvalue)
    if(allheld && allsamevalue){
      settenzies(true)
      console.log("You won")
    }
   
  }, [dice])

  
  return (
    <>
      <main>
        {tenzies && <Confetti/>}
        {tenzies && <h1>YOU WON</h1>  }
        <div className="tenzie-text">
        <h1 className="title">Tenzies</h1>
        <p className="instruction">Roll until all dice are same. <br/>
        Click each die to freeze it at its current value between rolls</p>
        </div>

        <div className="container">
          {dice.map((die) => {
            return <Die key={die.id} value={die.value} isheld={die.isheld} holdDice={()=>holdDice(die.id)}/>
          })}
        </div>

        <button onClick={rolldice} className="roll-btn">
          {tenzies ? 'New Game' : "Roll"}
        </button>

        <p>Rolls: {rolls} </p>
      {tenzies && <p>You won in {rolls} rolls!</p>}

      </main>
    </>
  )
}

export default App;
