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
      d="M159.94 215.17c-1.5-.59-2.95-1-2.15-2.82a10.75 10.75 0 0 1 1.42-2q18.84-25 37.69-50c.87-1.15 1.54-3.5 3.71-1.74s0 3-.87 4.08Q181 187.71 162.1 212.7c-.67.89-1.47 1.69-2.16 2.47ZM156.56 169.86h-12.45c-1.26 0-2.92.28-3-1.64-.13-2.34 1.77-2 3.18-2 3.92-.05 7.85 0 12.31 0v-12.9c0-1.33 0-2.73 1.93-2.77s2 1.28 2 2.66v12.44c4.49 1.06 8.63.33 12.71.58 1.31.08 2.88-.06 2.81 1.89s-1.66 1.75-2.95 1.76h-12.55v12.66c0 1.51.12 3.15-2.18 3-2-.11-1.79-1.6-1.8-2.89-.03-3.98-.01-7.94-.01-12.79ZM207.32 201.31h14.87c1.29 0 2.84-.2 2.77 1.85-.06 1.83-1.43 2-2.81 2h-29.26c-1.58 0-3.16-.18-3-2.3s1.84-1.54 3.05-1.55c4.79-.04 9.58 0 14.38 0Z"
    />
  </Svg>
)

export default SvgComponent