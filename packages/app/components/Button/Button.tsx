import tw from 'app/design-system/tailwind'
import { Text, TouchableOpacity } from 'react-native'

type ButtonProps = {
  children: React.ReactNode
  isLoading?: boolean
} & React.ComponentProps<typeof TouchableOpacity>

export const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={tw`border-2 border-gray-600 p-2 rounded-lg`}
    >
      {isLoading ? <Text>Loading...</Text> : <Text>{children}</Text>}
    </TouchableOpacity>
  )
}
