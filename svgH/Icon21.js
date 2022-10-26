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
    <Path
      stroke={props.fill}
      strokeWidth={props.bold ? 5 : 0}
      d="M84.61 36.76h-.11l-10.25 7.15V39l10.31-7.41h4.73v38.8h-4.68ZM70.5 83.85h27.4V88H70.5ZM81.27 122.87l-9.35-14h5.21l6.71 10.48H84l6.63-10.48h5.21l-9.42 13.78 9.29 14.15h-5.23l-6.69-10.6h-.11l-6.74 10.63h-5.18Z"
    />
  </Svg>
)

export default SvgComponent
