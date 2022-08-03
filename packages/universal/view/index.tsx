import { ComponentProps } from 'react'
import { View as DripsyView } from 'dripsy'
import { tw as tailwind, WithTWProp } from 'universal/tailwind'

type ViewProps = WithTWProp<ComponentProps<typeof DripsyView>>

const View = ({ tw, sx, variant, ...props }: ViewProps) => {
  return (
    <DripsyView
      sx={{ ...sx, ...tailwind.style(tw) }}
      variant={variant}
      {...props}
    />
  )
}

export { View }
