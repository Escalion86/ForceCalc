export const hashString = (code) => {
  let hash = 5381
  let i = code.length

  while (i) hash = (hash * 33) ^ code.charCodeAt(--i)

  const result = Math.abs((hash >>> 0) & 0xffffffff)
  return result
}

export const hashString8 = (code) => {
  let hash = hashString(code)
  return (hash % 100000000).toString().padStart(8, '0')
}

// console.log('hashString8 :>> ', hashString8('Сергей Ступаков'))
