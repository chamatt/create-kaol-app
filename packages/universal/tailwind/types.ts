type TW = string | string[]

export type { TW }

export type WithTWProp<P> = P & {
  tw?: TW
}
