import { Routes, Route } from 'react-router-dom'
import Nav from './Navbar.jsx';
import Home from './Pages/Home.jsx';
import About_page from './Pages/About.jsx'
import Events from './Pages/Events.jsx';
import Footer from './Footer.jsx'
import ConnectPage from './Contact_components/Connect-page.jsx';
import Partners from './Partners_compoonents/partners.jsx'
import Feedback from './Pages/Feedback.jsx';
import Admin from './Pages/Admin.jsx';
function App() {
  return (<>
    <Nav />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About_page />}></Route>
      <Route path='/events' element={<Events />}></Route>
      <Route path='/connect' element={<ConnectPage />}></Route>
      <Route path='/partner' element={<Partners />}></Route>
      <Route path='/feedback' element={<Feedback />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
    <Footer/>
  </>)
}

export default App
