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
    <Path d="M187 144.12c-6.08 6.3-13 10-20.28 12.68-.47-.47-.69-.58-.69-.7v-4.13a42.94 42.94 0 0 0 21.17-14.23h4.68v83.39c-1.39.54-3 .19-4.86.2Z" />
  </Svg>
)

export default SvgComponent
