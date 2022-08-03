import { ComponentProps } from 'react'
import { Text as DripsyText, H1, Theme } from 'dripsy'

import tailwind from 'app/design-system/tailwind'

type Variant = keyof Theme['text']

type TextProps = { tw?: string; variant?: Variant } & Omit<
  ComponentProps<typeof DripsyText>,
  'variant'
>

// Note: You can wrap <DripsyText> in a <View> with a background color
// to verify if the text is rendered correctly and if Capsize is working well.

const Text = ({ tw, sx, variant, ...props }: TextProps) => {
  return (
    <DripsyText
      sx={{ ...sx, ...tailwind.style(tw) }}
      variant={variant}
      {...props}
    />
  )
}

export { Text }
