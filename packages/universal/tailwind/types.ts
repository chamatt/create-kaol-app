type TW = string | string[]

export { TW }

export type WithTWProp<P> = P & {
  tw?: TW
}
