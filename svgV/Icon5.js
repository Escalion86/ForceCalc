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
    <Path d="M200.29 142.34h-47.46c-.13-1.64-.23-2.83-.35-4.37h52.9c-.08 1.67.28 3.54-.32 5-10.56 26-21.24 51.9-32 78.09l-5.42.29c10.97-26.53 21.67-52.44 32.65-79.01Z" />
  </Svg>
)

export default SvgComponent
