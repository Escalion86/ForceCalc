import * as React from 'react'
import Svg, { G, Image, Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 167.98 167.98"
    width={144}
    height={144}
    {...props}
  >
    <Path d="M47 70.49h4.84v4.23H52a8.4 8.4 0 0 1 7.93-4.79A8.11 8.11 0 0 1 68 75.5h.11a9.68 9.68 0 0 1 9.07-5.57c5.74 0 9.44 3.76 9.44 9.52v20h-4.81V80.56c0-4-2.19-6.34-6-6.34s-6.55 2.86-6.55 6.78v18.43h-4.84V80c0-3.51-2.34-5.82-5.93-5.82-3.84 0-6.62 3-6.62 7.07v18.18H47ZM92.78 80.9h11.86V69.38h4.51V80.9H121v4.51h-11.85v11.52h-4.51V85.41H92.78Z" />
  </Svg>
)

export default SvgComponent
