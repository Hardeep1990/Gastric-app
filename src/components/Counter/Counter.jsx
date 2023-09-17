import React,{useState} from 'react'
import styles from './Counter.module.css'

function Counter() {

    let [count, setCount] = useState(0);

    let increaseValue = () => {
        setCount((count += 1));
    };

    let decreaseValue = ()=>{
        setCount ((count -= 1));
    };


  return (
    <>
    <div className={styles.counterBtnSec}>

        <div className={styles.incSec}>
            <button onClick={increaseValue} value={count} onChange={(e) => setCount(e.currentTarget.value)} className={styles.increaseBtn}>+</button>
        </div>

        <div className={styles.textSec}>
            <h4 type='text' className={styles.displayBtn}>{count}</h4>
        </div>

        <div className={styles.decSec}>
            <button onClick={decreaseValue}  value={count} onChange={(e) => setCount(e.currentTarget.value)} className={styles.decreaseBtn}>-</button>
        </div>
        
    </div>
    </>
  )
}

export default Counter
