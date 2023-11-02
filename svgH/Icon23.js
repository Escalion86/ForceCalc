import * as React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 168 168"
    width={144}
    height={144}
    {...props}
  >
    <Path
      // stroke={props.fill}
      // strokeWidth={props.bold ? 5 : 0}
      d="M95.6 88.37 85.69 74h5.52l7.12 10.78h.11l7-10.78H111l-10 14.18 9.85 14.57h-5.5l-7.09-11h-.11l-7.15 11h-5.5Z"
    />
    <Path
      // stroke={props.fill}
      // strokeWidth={props.bold ? 5 : 0}
      d="M70.43 118.06c-2.68-5.42-5.37-10.83-8.19-16.52l-4.75 2.65-2-2.71 9.15-7.18 5.71 11.28 12.77-45.22h28.7V64H86.39c-5 18.06-9.87 35.91-14.77 53.77ZM59 75.51a9.41 9.41 0 0 0 4.6 1.31c3.62 0 4.74-2.3 4.71-4 0-2.91-2.66-4.16-5.38-4.16h-1.56v-2.14h1.57c2 0 4.64-1 4.64-3.52 0-1.66-1.06-3.13-3.65-3.13a7.66 7.66 0 0 0-4.16 1.37L59 59.19a9.89 9.89 0 0 1 5.44-1.6c4.09 0 6 2.44 6 5 0 2.15-1.28 4-3.84 4.9v.06a5.43 5.43 0 0 1 4.64 5.35c0 3.32-2.59 6.24-7.58 6.24a10.58 10.58 0 0 1-5.41-1.41Z"
    />
  </Svg>
)

export default SvgComponent
