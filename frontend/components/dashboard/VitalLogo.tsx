import { chakra, HTMLChakraProps, useToken } from '@chakra-ui/react'

export const VitalLogo = (
  props: HTMLChakraProps<'svg'> & { iconColor?: string }
) => {
  const { iconColor = 'black', ...rest } = props
  const color = useToken('colors', iconColor)

  return (
    <chakra.svg
      width="100%"
      height="100%"
      viewBox="0 0 372 314"
      fill="none"
      {...rest}
    >
      <path
        d="M185.53 72.5053C204.281 44.0924 258.928 -4.57799 318.669 35.9042C378.41 76.3865 348.801 138.092 326.53 163.885"
        stroke={color}
        strokeWidth="35"
        strokeLinecap="round"
        strokeDasharray="1 70"
      />
      <path
        d="M327.512 163.093L192.873 293.229C188.975 296.997 182.784 296.972 178.916 293.173L46.4675 163.093C28.5125 147.494 -2.90857 98.1249 38.2381 47.345C79.3848 -3.43492 141.978 15.9809 185.868 72.735"
        stroke={color}
        strokeWidth="35"
        strokeLinecap="round"
      />
    </chakra.svg>
  )
}
