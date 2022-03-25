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
    <Path d="M179.31 222.87H174c1.24-6.28 2.41-12.2 3.65-18.46h8.23Z" />
  </Svg>
)

export default SvgComponent
