// on Web, we use the client that wraps next with
// the withTRPC HOC

export const APIProvider = ({ children }: { children: React.ReactElement }) => (
  <>{children}</>
)
