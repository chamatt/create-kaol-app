import { trpc } from 'app/utils/trpc'
import tw, { styled } from 'app/utils/tw'
import { View, Text } from 'dripsy'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

// If you wrap a component in `styled`, you can pass the tailwind classes
// directly through the `className` prop.
// Otherwise, you pass it via the `style` prop, with the `tw` function.
const TextStyled = styled(Text, 'mb-4')

export function PostDetailScreen() {
  const [id] = useParam('id')

  const { data, isLoading } = trpc.useQuery(['post.get-by-id', { id: id! }], {
    enabled: !!id,
  })

  if (isLoading)
    return (
      <View style={tw`flex justify-center items-center`}>
        <TextStyled className="text-center font-bold">Loading...</TextStyled>
      </View>
    )

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TextStyled className="text-center font-bold text-red-500">
        {data?.title}
      </TextStyled>
      <TextStyled className="mb-4">{data?.content}</TextStyled>
      <TextStyled className="text-gray-600">
        By: {data?.author?.name}
      </TextStyled>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
