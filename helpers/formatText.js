const formatText = (text, separateChar) => {
  if (!text) return '0'
  const endIndex = text.includes(',') ? text.indexOf(',') : text.length

  let newText = text

  if (endIndex > 3) {
    newText =
      newText.slice(0, endIndex - 3) +
      separateChar +
      newText.slice(endIndex - 3)
  }
  if (endIndex > 6) {
    newText =
      newText.slice(0, endIndex - 6) +
      separateChar +
      newText.slice(endIndex - 6)
  }
  return newText
}

export default formatText