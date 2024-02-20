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
      d="M204 188.29c-.48 11-10.51 20.16-22.5 20.71-17.09.79-29.06-12.43-28.24-31.17.87-20.42 16.32-32.83 34.74-27.83 9 2.41 15.12 9.42 15.18 17.29-1.6.87-2.56.11-3-1.36-3.32-10.47-11.29-13.9-21.28-13.48s-16.8 5.87-20.08 15.29a33.32 33.32 0 0 0 .69 24.83c3.82 8.81 11.48 13.53 21 13.1s16.33-5 19.84-14.07c.58-1.52.35-4.04 3.65-3.31Z"
    />
  </Svg>
)

export default SvgComponent
