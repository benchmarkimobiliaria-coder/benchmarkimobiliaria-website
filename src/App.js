import "./App.css"
import Pages from "./components/pages/Pages"
import { FavoritesProvider } from "./context/FavoritesContext"

function App() {
  return (
    <FavoritesProvider>
      <Pages />
    </FavoritesProvider>
  )
}

export default App
