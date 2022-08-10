import { FunctionComponent } from 'react'
import { StyleProp } from 'react-native'
import { create, TwConfig } from 'twrnc'
import { ClassInput } from 'twrnc/dist/esm/types'
import config from './helpers/tailwind.config'

export const tw = create(config as TwConfig)

type StyledTailwind = {
  className?: string
  tw?: string
  style?: StyleProp<any>
}

/**
 * @example
 * 
import { styled } from 'app/utils/tw'
import { Text, View } from 'react-native'

// With default classes (like styled-components)
const TextStyled = styled(Text, 'text-red-500 mb-4')
<TextStyled className="font-bold">Welcome to Kaol.</TextStyled>

// Without default classes (just adds the className prop)
const TextStyled = styled(Text)
<TextStyled className="font-bold text-red-500 mb-4">Welcome to Kaol.</TextStyled>

// Or you can just use the `tw` function:
<View style={tw`bg-blue-500`}>

 * @description wraps a React Component and adds a className/tw props that accepts tailwind classes
 */

export function styled<P>(
  WrappedComponent: React.ComponentType<P>,
  ...inputs: ClassInput[]
): FunctionComponent<P & StyledTailwind> {
  const ComponentWithStyle = (props: P & StyledTailwind) => {
    return (
      <WrappedComponent
        {...props}
        style={[
          tw.style(
            ...inputs,
            props.tw,
            props.className,
            ...[].concat(props.style)
          ),
        ]}
      />
    )
  }
  ComponentWithStyle.displayName = `styled(${WrappedComponent.displayName})`
  return ComponentWithStyle
}
