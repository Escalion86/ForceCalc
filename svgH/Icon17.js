import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 144 144"
    width={144}
    height={144}
    {...props}
  >
    <Path d="M82.06 52.77H57c-1.63-1.91-1.2-3.5-.73-5.42h31.34c1.32 2.83.4 5.45-.66 8.06-5 12.47-10.23 24.89-15.09 37.44-1.43 3.69-3.4 5-7.75 3.52Z" />
  </Svg>
)

export default SvgComponent
