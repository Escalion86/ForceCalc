import * as React from 'react'
import Svg, { Defs, G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 144 144"
    width={144}
    height={144}
    {...props}
  >
    <Path d="M89.35 72.65c.07 5.48-.69 11.24-3.51 16.51-3 5.6-7.68 8.67-14.16 8.57-6.27-.11-11-3.07-13.53-8.68a40.45 40.45 0 0 1 .06-34.34c2.53-5.61 7.32-8.5 13.59-8.56 6.47-.07 11.14 3 14.1 8.63 2.85 5.46 3.54 11.39 3.45 17.87ZM60.78 72c-.05 4.5.16 8.95 1.81 13.23s4.47 7.13 9.16 7.23c5 .11 8.14-2.74 9.62-7.25a42.54 42.54 0 0 0 .11-26.4c-1.41-4.5-4.51-7.46-9.46-7.5s-7.89 3.06-9.55 7.43-1.74 8.8-1.69 13.26Z" />
  </Svg>
)

export default SvgComponent
