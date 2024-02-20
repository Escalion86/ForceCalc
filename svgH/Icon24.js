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
      d="M70.43 118.06c-2.68-5.42-5.37-10.83-8.19-16.52l-4.75 2.65-2-2.71 9.15-7.18 5.71 11.28 12.77-45.22h28.7V64H86.39c-5 18.06-9.87 35.91-14.77 53.77ZM60.25 63.26l3.4 9.15c.35 1 .73 2.24 1 3.17h.06c.29-.93.61-2.11 1-3.23l3.07-9.09h3l-4.22 11c-2 5.31-3.39 8-5.31 9.69a7.68 7.68 0 0 1-3.46 1.83l-.7-2.37a7.47 7.47 0 0 0 2.46-1.38 8.51 8.51 0 0 0 2.37-3.13 2 2 0 0 0 .22-.67 2.32 2.32 0 0 0-.19-.74l-5.77-14.23Z"
    />
  </Svg>
)

export default SvgComponent
