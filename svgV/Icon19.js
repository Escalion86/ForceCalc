import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 357 357"
    width={144}
    height={144}
    {...props}
  >
    <Path d="M145.46 169v-7h70v7ZM215.52 190v7h-70v-7Z" />
  </Svg>
)

export default SvgComponent
