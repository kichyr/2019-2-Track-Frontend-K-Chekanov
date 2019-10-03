/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */
import { convertBytesToHuman } from "./convertBytesToHuman.js"


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman('test')).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman({type:"Fiat", model:"500", color:"white"})).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe('5B')
  expect(convertBytesToHuman(1024)).toBe('1KB')
  expect(convertBytesToHuman(1536)).toBe('1.5KB')
  expect(convertBytesToHuman(1572864)).toBe('1.5MB')
  expect(convertBytesToHuman(1610612736)).toBe('1.5GB')
});

// другая группа проверок
