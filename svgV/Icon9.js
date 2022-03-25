import * as React from 'react'
import Svg, { Defs, G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 357 357"
    width={144}
    height={144}
    {...props}
  >
    <Path d="M195.84 196.47h15v4.86h-14.76v19.85H191v-19.56h-43.8c-.09-1.9-.19-3.65-.26-5.1l44.24-58.82h4.66Zm-5-.27v-51.3c-13.3 17.19-25.49 34.18-38.42 51.3Z" />
  </Svg>
)

export default SvgComponent
