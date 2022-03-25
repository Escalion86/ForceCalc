import * as React from 'react'
import Svg, { Defs, G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 144 144"
    width={192}
    height={192}
    {...props}
  >
    <Path d="M88.48,91.6v5.14H55.77c-.49-5.09,1.7-9.27,5.32-12.55,4.18-3.77,8.91-7,13.19-10.63A31.6,31.6,0,0,0,81,66.36c3.08-5.13,1.38-11.08-3.22-13.35-5.77-2.85-12.22-.65-14.63,5.18a47.46,47.46,0,0,0-1.68,6.59h-5a15.64,15.64,0,0,1,9.95-16.93c7.07-2.66,15.48-.52,19.44,4.95s3.57,13.69-1.71,19.31c-3.25,3.47-7.47,6-11.16,9.11-3.5,2.93-6.87,6-10.3,9l.68,1.35Z" />
  </Svg>
)

export default SvgComponent
