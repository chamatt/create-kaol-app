import { Unmatched } from 'expo-router'
import { forwardRef } from 'react'

const NotFound = forwardRef((props, ref) => {
  const route = (props as any).route
  console.warn('Unmatched route: ', route.path)
  return <Unmatched ref={ref} {...props} />
})

export default NotFound
