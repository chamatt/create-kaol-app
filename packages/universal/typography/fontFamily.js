const { Platform } = require('react-native')

exports.fontFamily = (font) => {
  if (Platform.OS === 'web') {
    return `"${font.replace(/-/g, ' ')}"`
  }
  return font
}
