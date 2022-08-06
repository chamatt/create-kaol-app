import { useRouter } from 'solito/router'
import { styled } from 'universal/tailwind'
import { Button, ButtonProps } from '../Button'

export const GoBack = styled((props: Omit<ButtonProps, 'children'>) => {
  const { back } = useRouter()

  return (
    <Button onPress={back} {...props}>
      👈 Go Back
    </Button>
  )
})
