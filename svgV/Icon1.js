import * as React from 'react'
import Svg, { Defs, G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

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
      d="M175.56 208.69c-5.41-4.55-5.1-12.56-9.31-18.21h-27.94c-4.11 5.64-4.1 13.52-9.32 18.3l-2-1 22.89-56.31a4.24 4.24 0 0 1 4.64-.25c7.53 18.55 15.19 37.39 22.84 56.24Zm-23.28-54.23c-4.56 11.37-8.66 21.58-13 32.33h25.94c-4.22-10.66-8.35-20.87-12.94-32.33ZM231.24 188.89c.09 10.42-10.08 19.84-22.13 20.51-16.92.94-29.57-12.84-28.39-30.92 1-15.8 9-26 22.22-28.58 12.66-2.46 25.38 4.77 27.88 15.85a10.1 10.1 0 0 1 .12 1.79c-2.09 1.23-3 .19-3.49-1.44-2.88-9.35-10-12.81-19-13.16-9.49-.37-16.83 3.73-20.94 12.4a32.25 32.25 0 0 0-.35 27.93c3.92 8.82 11.55 13.39 21.11 12.81s16.23-5.21 19.6-14.32c.91-2.36.92-2.35 3.37-2.87Z"
    />
  </Svg>
)

export default SvgComponent
