import { trpc } from 'app/utils/trpc'
import { createParam } from 'solito'
import { styled, tw } from 'universal/tailwind'
import { Text, View } from 'universal'
import { GoBack } from 'app/components/GoBack'
import { RouteTypes } from 'app/navigation/routePaths'

const { useParam } = createParam<RouteTypes['postDetail']>()

// If you wrap a component in `styled`, you can pass the tailwind classes
// directly through the `className` prop.
// Otherwise, you pass it via the `style` prop, with the `tw` function.
const TextStyled = styled(Text, 'mb-4 text-center')

export function PostDetailScreen() {
  const [id] = useParam('id')

  const { data, isLoading } = trpc.useQuery(['post.get-by-id', { id: id! }], {
    enabled: !!id,
  })

  if (isLoading)
    return (
      <View className="flex justify-center">
        <TextStyled className="text-center font-bold">Loading...</TextStyled>
      </View>
    )

  return (
    <View className="flex-1 items-center justify-center p-4">
      <TextStyled className="font-bold text-red-500">{data?.title}</TextStyled>
      <TextStyled className="mb-4">{data?.content}</TextStyled>
      <TextStyled className="text-gray-600">
        By: {data?.author?.email}
      </TextStyled>
      <GoBack />
    </View>
  )
}
