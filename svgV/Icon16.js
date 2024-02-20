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
    <Path
      stroke={props.fill}
      strokeWidth={props.bold ? 5 : 0}
      d="M175.84 183.42h-31.18v-7.69h30.85v-34.84h7.84v34.5h31v7.87h-30.87v34.87h-7.64Z"
    />
  </Svg>
)

export default SvgComponent
