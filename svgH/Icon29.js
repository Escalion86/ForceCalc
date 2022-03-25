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
    <Path d="M60.33 71.84c4.2-5.48 8.7-7.94 14.48-7.51A15.1 15.1 0 0 1 89.06 77.4c1.25 8.75-2.74 16.32-10.12 19.18s-15.89.44-20-5.75c-6.47-9.7-5.49-29.84 1.91-38.89 4.11-5 9.46-6.37 15.69-5.3a13.28 13.28 0 0 1 11 9C88 57 89 58.77 87 59.47c-1.65.57-3.91.88-4.74-1.41-1.89-5.22-5.67-7.27-10.91-6.56-5.55.75-8 4.88-9.54 9.72a37.44 37.44 0 0 0-1.48 10.62Zm22.93 9c0-6.94-4.3-11.63-10.75-11.6s-11.11 5-11.18 11.51 4.59 11.76 10.77 11.92c6.55.17 11.11-4.67 11.16-11.83Z" />
  </Svg>
)

export default SvgComponent
