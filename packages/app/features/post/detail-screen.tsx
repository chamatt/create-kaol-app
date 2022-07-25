import { trpc } from 'app/utils/trpc'
import { View, Text } from 'dripsy'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

export function PostDetailScreen() {
  const [id] = useParam('id')

  const { data, isLoading } = trpc.useQuery(['post.get-by-id', { id: id! }], {
    enabled: !!id,
  })

  if (isLoading)
    return (
      <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>
          Loading...
        </Text>
      </View>
    )

  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>
        {data?.title}
      </Text>

      <Text sx={{ mb: 16 }}>{data?.content}</Text>

      <Text sx={{ mb: 16 }}>By: {data?.author?.name}</Text>

      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
