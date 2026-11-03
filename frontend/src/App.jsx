import { Routes, Route } from 'react-router-dom'
import Nav from './Navbar.jsx';
import Home from './Pages/Home.jsx';
import About_page from './Pages/About.jsx'
import Events from './Pages/Events.jsx';
import Footer from './Footer.jsx'
import ContactPage from './Contact_components/Contact-page';
import Partners from './Partners_compoonents/partners.jsx'

function App() {
  return (<>
    <Nav />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About_page />}></Route>
      <Route path='/events' element={<Events />}></Route>
      <Route path='/connect' element={<ContactPage />}></Route>
      <Route path='/partner' element={<Partners />}></Route>
    </Routes>
    <Footer/>
  </>)
}

export default App
