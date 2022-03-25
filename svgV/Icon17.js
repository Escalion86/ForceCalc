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
    <Path d="M151.47 179.15c.28-9.38 1.09-18.59 4.88-27.29 4.41-10.09 11.9-15.9 23.05-15.93 11.37 0 19.36 5.74 23.25 16.25 6.82 18.41 6.82 37.07-.32 55.39-3.92 10.07-11.83 15.49-22.75 15.5-10.41 0-17.92-5-22.5-14.42s-5.36-19.39-5.61-29.5Zm50.92.76c.22-9.87-.72-19.23-5.11-27.91-4.08-8.07-10.62-12.08-19.8-11.31-8.65.72-14 5.93-16.79 13.59a73.12 73.12 0 0 0-.23 49.75c3.36 9.81 9.89 14.26 18.79 14.32 9.13.07 15.51-4.61 19.39-14.33a59.28 59.28 0 0 0 3.75-24.11Z" />
  </Svg>
)

export default SvgComponent
