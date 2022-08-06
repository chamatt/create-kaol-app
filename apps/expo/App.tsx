import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { LogBox } from 'react-native'

// Some utilities are only available in react-native-web but not in react-native.
// E.g. `cursor-pointer`, but we want to use it to make the app more accessible on the web
// so we ignore the warnings in react-native
LogBox.ignoreLogs([/unknown or invalid utility/gi])

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
