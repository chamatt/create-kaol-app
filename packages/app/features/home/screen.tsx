import { trpc } from 'app/utils/trpc'
import tw, { styled } from '../../utils/tw'
import { Text, View, H1, P, A, useSx } from 'dripsy'
import { View as RNView } from 'react-native'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { useAuth } from 'app/provider/auth'

const Card = styled(View, 'bg-white shadow-sm mb-4 rounded-lg p-6 border')

export function HomeScreen() {
  const { data: posts } = trpc.useQuery(['post.get-all'])
  const { user } = useAuth()

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <TextLink
        href="/auth/login"
        textProps={{
          style: tw`text-md font-bold text-blue-700 mb-2`,
        }}
      >
        Login
      </TextLink>
      <H1 style={tw`font-extrabold text-3xl`}>
        Welcome to Kaol. {user?.email}
      </H1>

      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P sx={{ textAlign: 'center' }}>
          Kaol is made by{' '}
          <A
            href="https://github.com/chamatt"
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            sx={{ color: 'blue' }}
          >
            @chamatt
          </A>
          .
        </P>
      </View>
      <View sx={{ height: 32 }} />
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
    </View>
  )
}
