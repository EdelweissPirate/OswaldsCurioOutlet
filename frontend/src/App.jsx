import Layout from './components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <Layout />
      <ToastContainer 
        position="bottom-right"
      />
    </main>
  )
}

export default App
