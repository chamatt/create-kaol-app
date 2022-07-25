import { trpc } from 'app/utils/trpc'
import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'

export function HomeScreen() {
  const sx = useSx()

  const { data: posts, isLoading } = trpc.useQuery(['post.get-all'])

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16 }}
    >
      <H1 sx={{ fontWeight: '800' }}>Welcome to Solito.</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P sx={{ textAlign: 'center' }}>
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            sx={{ color: 'blue' }}
          >
            Fernando Rojo
          </A>
          .
        </P>
      </View>
      <View sx={{ height: 32 }} />
      {posts?.map((post) => (
        <View
          key={post.id}
          sx={{
            borderWidth: 1,
            borderStyle: 'solid',
            padding: 20,
            marginBottom: 10,
          }}
        >
          <TextLink
            href={`/post/${post.id}`}
            textProps={{
              style: sx({ fontSize: 16, fontWeight: 'bold', color: 'blue' }),
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
            <Text
              selectable={false}
              sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
            >
              Moti Link: {post.title}
            </Text>
          </MotiLink>
        </View>
      ))}
    </View>
  )
}
