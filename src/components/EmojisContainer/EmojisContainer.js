import React from 'react'
import PropTypes from 'prop-types'

import styles from './EmojiList.module.css'

function getClassNameByCode(code) {
  switch (code) {
    case 'alian':
      return styles.alian
    case 'dark_blue_moon':
      return styles.dark_blue_moon
    case 'nerd':
      return styles.nerd
    case 'poop':
      return styles.poop
    case 'upside_down_face':
      return styles.upside_down_face
    case 'very_mad_emodji':
      return styles.very_mad_emodji
    default:
      break
  }
}

export const parseEmojis = (text) => {
  const reg = /:(\w+):/g
  let parsed = ''
  let result
  let prevMatch = 0
  while ((result = reg.exec(text)) !== null) {
    parsed += text.slice(prevMatch, result.index) + `<i class="${getClassNameByCode(result[1])}"></i>`
    prevMatch = result.index + result[0].length
  }
  parsed += text.slice(prevMatch, text.length)
  return parsed
}

const EmojisContainer = ({ callback }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className={styles.EmojisContainer}>
      <div
        className={styles.alian}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('alian')
        }}
        onKeyPress={(e) => {}}
      />

      <div
        className={styles.dark_blue_moon}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('dark_blue_moon')
        }}
        onKeyPress={(e) => {}}
      />

      <div
        className={styles.nerd}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('nerd')
        }}
        onKeyPress={(e) => {}}
      />

      <div
        className={styles.poop}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('poop')
        }}
        onKeyPress={(e) => {}}
      />

      <div
        className={styles.upside_down_face}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('upside_down_face')
        }}
        onKeyPress={(e) => {}}
      />

      <div
        className={styles.very_mad_emodji}
        role="button"
        tabIndex={-1}
        aria-label="emoji"
        style={{ width: '30px', height: '30px', marign: '5px' }}
        onClick={(e) => {
          callback('very_mad_emodji')
        }}
        onKeyPress={(e) => {}}
      />
    </div>
  )
}

EmojisContainer.propTypes = {
  callback: PropTypes.func,
}
export default EmojisContainer
