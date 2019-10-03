/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

//console.log(convertBytesToHuman('asdfs'))
export function convertBytesToHuman(bytes) {
  if(typeof bytes !== 'number' || bytes < 0)
    return false;
  if(bytes < 1024)
    return bytes + 'B'
  if((bytes = bytes/1024) < 1024)
    return bytes + 'KB'
  if((bytes = bytes/1024) < 1024)
    return bytes + 'MB'
  else
    return bytes/1024 + 'GB';
}
