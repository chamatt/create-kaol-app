import { trpc } from 'app/utils/trpc'
import tw, { styled } from '../../design-system/tailwind'
import { Text, View } from 'dripsy'
import { View as RNView } from 'react-native'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'

const Card = styled(View, 'bg-white shadow-sm mb-4 rounded-lg p-6 border')

export function PostListScreen() {
  const { data: posts } = trpc.useQuery(['post.get-all'])

  return (
    <RNView style={tw`flex-1 justify-center items-center p-4`}>
      {posts?.map((post) => (
        <Card key={post.id}>
          <TextLink
            href={`/post/${post.id}`}
            textProps={{
              style: tw`text-md font-bold text-blue-700 mb-2`,
            }}
          >
            Regular Link: {post.title}
          </TextLink>
          <MotiLink
            href={`/post/${post.id}`}
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <Text selectable={false} style={tw`text-md text-black font-bold`}>
              Moti Link: {post.title}
            </Text>
          </MotiLink>
        </Card>
      ))}
    </RNView>
  )
}
