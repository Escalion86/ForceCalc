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
      d="M158 166.37h-3.63c-3.12-15.8 10.35-30.73 26.63-29.64a36.75 36.75 0 0 1 8.34 1.48c12.48 3.86 18.75 15.95 15.19 28.94a29.2 29.2 0 0 1-10.41 15.45c-4.57 3.6-9.43 6.83-14 10.43-5.08 4-10.16 8.06-14.91 12.45a19.76 19.76 0 0 0-6.65 11.84h46.87v4.77h-52.2c-.86-2.42-.37-4.64.29-6.85a28.34 28.34 0 0 1 7.76-12.6c4-3.76 8.15-7.34 12.45-10.73 5.35-4.23 11-8 16.36-12.29 5.61-4.5 9.49-10.1 10.22-17.57 1.05-10.63-5.87-19.34-16.48-20.45-14.22-1.49-22.79 5.17-25 19.46-.27 1.64-.49 3.27-.83 5.31Z"
    />
  </Svg>
)

export default SvgComponent
