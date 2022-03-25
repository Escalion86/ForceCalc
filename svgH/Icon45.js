import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={192}
    height={192}
    viewBox="0 0 144 144"
    {...props}
  >
    <Path d="M57 65.5c0 .9.9 1.5 2.5 1.5H62v11c0 10.3.1 11 2 11s2-.7 2-11V67h10v8.4C76 87 76.9 89 82 89c3.4 0 4-.3 4-2.1 0-1.6-.4-1.9-1.9-1.4-2.9.9-4.1-2.2-4.1-10.9V67h3c2 0 3-.5 3-1.5 0-1.3-2.3-1.5-14.5-1.5S57 64.2 57 65.5z" />
  </Svg>
)

export default SvgComponent
