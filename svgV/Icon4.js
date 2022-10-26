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
      d="M144.47 182.27v-7.58h70v7.58ZM186 154.07c-.08 4.84-2.3 7.48-6.23 7.62s-6.38-2.25-6.62-6.44c-.25-4.37 2.38-6.64 6.17-6.81s6.38 2.12 6.68 5.63ZM185.92 200.87c0 5.48-2.62 7.72-6.43 7.71s-6.49-2.2-6.4-6.58c.1-4.2 2.59-6.65 6.42-6.67a6 6 0 0 1 6.41 5.54Z"
    />
  </Svg>
)

export default SvgComponent
