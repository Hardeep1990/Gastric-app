import React, { useState } from 'react'
import styles from './RefluxCard.module.css'
import Reflux from'../Images/Reflux.png'
import RefluxPM from '../EventModal/RefluxPM';

function RefluxCard(props) {
    const[openRefluxModal, setOpenRefluxModal] = useState(false);
    const {previousAnswer,handleSave, questionId} = props;
    const showIcon = previousAnswer !== '0' || previousAnswer !== 0;
    
  return (
  <>
    <div className={styles.eventRefluxCardSec} onClick={()=>{setOpenRefluxModal(true)}}>
    {showIcon && <p className={styles.eventScore}>{`${[previousAnswer]}`}</p>}
        <img src={Reflux} className={styles.reluxImg} alt=''/>
        <h3 className={styles.erow1Text}>Reflux</h3>
    </div>
    <RefluxPM openRefluxModal={openRefluxModal} setOpenRefluxModal={setOpenRefluxModal} handleSave={handleSave} questionId={questionId}/> 
  </>
  )
}

export default RefluxCard