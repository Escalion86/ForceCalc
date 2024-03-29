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
      d="M151.44 196.58h4.32c.51 2.29.89 4.57 1.53 6.76 2.84 9.7 11.19 15.22 22.62 15.06 10.87-.15 18.81-5.89 21.27-15.36 2.84-11-3.13-20.56-14.33-22.56-4.38-.78-8.88-.85-13.63-1.27.06-1.15.11-2.19.2-3.83 3.28 0 6.25.12 9.21 0 10.87-.53 17.29-6.68 17.36-16.51.08-10.23-6.68-17.34-17.23-18.12-13.76-1-20.58 4.31-25 19.79h-4c.55-10.73 6.81-20.09 15.91-22.86 11-3.35 21.61-2.54 30.07 6.16 9.11 9.37 6.68 25.5-4.46 32.32l-2 1.19c3.12 2.5 6.5 4.44 8.86 7.24 8.37 10 5.5 25.93-5.89 33.62-15.01 10.09-43.44 5.26-44.81-21.63Z"
    />
  </Svg>
)

export default SvgComponent
