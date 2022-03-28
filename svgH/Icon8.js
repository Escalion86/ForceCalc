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
    <Path d="M48 73h11.48V61.9h4.35V73H75.3v4.35H63.83v11.14h-4.35V77.37H48ZM94 95.8h27.4v4.12H94ZM76.86 107.22l-3.66-.71 16.66-37.79 3.66.71Z" />
  </Svg>
)

export default SvgComponent
