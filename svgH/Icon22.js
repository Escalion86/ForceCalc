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
      d="M58.33 78.74V77l2.21-2.15c5.31-5.05 7.71-7.74 7.75-10.88 0-2.11-1-4.06-4.13-4.06a7.09 7.09 0 0 0-4.42 1.76l-.89-2a9.09 9.09 0 0 1 5.88-2.12c4.48 0 6.37 3.08 6.37 6 0 3.84-2.78 7-7.17 11.17l-1.66 1.53v.07h9.34v2.33Z"
    />
    <Path
      // stroke={props.fill}
      // strokeWidth={props.bold ? 5 : 0}
      d="M70.43 118.06c-2.68-5.42-5.37-10.83-8.19-16.52l-4.75 2.65-2-2.71 9.15-7.18 5.71 11.28 12.77-45.22h28.7V64H86.39c-5 18.06-9.87 35.91-14.77 53.77Z"
    />
    <Path
      // stroke={props.fill}
      // strokeWidth={props.bold ? 5 : 0}
      d="M95.6 88.37 85.69 74h5.52l7.12 10.78h.11l7-10.78H111l-10 14.18 9.85 14.57h-5.5l-7.09-11h-.11l-7.15 11h-5.5Z"
    />
  </Svg>
)

export default SvgComponent
