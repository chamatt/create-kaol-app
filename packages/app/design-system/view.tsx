import { ComponentProps } from 'react'
import { View as DripsyView } from 'dripsy'
import tailwind, { WithTWProp } from 'app/design-system/tailwind'

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
