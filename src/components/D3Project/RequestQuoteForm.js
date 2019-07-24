import React from 'react'
import styles from './styles.scss'
import CloseBtn from '../common/CloseBtn';

const RequestQuoteForm = ({quote, onChange, onSubmitQuote, onClearValue}) => {
  return (
    <form onSubmit={(e)=>onSubmitQuote(e)}>
      <div className={styles.inputGroup}>
        <CloseBtn classname={styles.clearTicker} 
          width={12} height={12} stroke={'white'} fill={'none'}
          onclick={(e)=>onClearValue('quote','',e)}
        />
        <input 
          className={styles.inputTron}
          type="text" 
          name="quote" 
          placeholder="Symbol" 
          value={quote}
          onChange={(e)=>onChange(e)}
          autoFocus
        />
        <button type="submit" className={styles.btnTron}>Punch It!</button>
      </div>
    </form>
  )
}

export default RequestQuoteForm
