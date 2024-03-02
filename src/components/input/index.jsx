import React from 'react'
import styles from './style.module.css'

const Input = ({type,placeholder,onChange,value}) => {
  return (
    <div className={styles.inputHolder}><input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  /></div>
  )
}

export default Input