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
    <Path d="M204.91 157.37a10.56 10.56 0 0 1-1.78.34 18.72 18.72 0 0 1-2.11-.23c-.64-1.74-1.25-3.42-1.89-5.1a17.08 17.08 0 0 0-12-11c-10-2.82-18.52.35-24.1 9.16-4.28 6.75-6.2 14.27-6.91 22.11-.32 3.61-.05 7.27-.05 11.78 1-1.75 1.73-2.86 2.39-4a26 26 0 0 1 26.67-12.71c10.93 1.7 18.74 9.41 21 20.49a30.36 30.36 0 0 1-3.71 22.5c-5.3 8.81-13.53 12.62-23.54 12.23-10.89-.41-19.08-5.42-23.37-15.73-4.38-10.51-5.08-21.58-4.15-32.76.74-9 2.7-17.67 7.42-25.56 4.59-7.67 11-12.1 20.1-12.84 13.86-1.11 24.88 7.65 26.03 21.32ZM202 195.09v-2c-.41-9.06-4.23-16.13-12.89-19.55s-17-2.13-24.14 4.33c-6.38 5.77-8.26 13.18-6.93 21.3 2.54 15.5 15.92 23 30.47 17.85 8.31-2.95 13.49-11.77 13.49-21.93Z" />
  </Svg>
)

export default SvgComponent
