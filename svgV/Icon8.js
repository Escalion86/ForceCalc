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
    <Path d="m174.72 180.67-22.44-21.41 4.81-6.16 22.41 22 22.13-21.75 5.22 5.69-22.62 21.35 22.54 21.31-4.89 6.15c-7.58-7.4-14.74-14.41-22.39-21.89l-22.36 21.9-4.79-5.93Z" />
  </Svg>
)

export default SvgComponent
