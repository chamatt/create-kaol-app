import { trpc } from 'app/utils/trpc'
import { View, Text } from 'universal'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { styled, tw } from 'universal/tailwind'
import { routes } from 'app/navigation/routePaths'
import { Button } from 'app/components/Button'
import { GoBack } from 'app/components/GoBack'

const Card = styled(View, 'bg-white shadow-sm mb-4 rounded-lg p-6 border')

export function PostListScreen() {
  const { data: posts } = trpc.useQuery(['post.get-all'])

  return (
    <View tw="flex-1 justify-center items-center p-4">
      {posts?.map((post) => (
        <Card key={post.id}>
          <TextLink
            href={routes.postDetail.getPath({ id: post.id })}
            textProps={{
              style: tw`text-base font-bold text-blue-700 mb-2`,
            }}
          >
            Regular Link: {post.title}
          </TextLink>
          <MotiLink
            href={routes.postDetail.getPath({ id: post.id })}
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <Text selectable={false} tw="text-base text-black font-bold">
              Moti Link: {post.title}
            </Text>
          </MotiLink>
        </Card>
      ))}
      <GoBack />
    </View>
  )
}
