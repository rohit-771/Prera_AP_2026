import '../CSS/Home.css';
import Home_intro from '../Home_components/Home_intro.jsx';
import Impact from '../About_components/impact.jsx';

export default function Home(){
    return(<div>
        <Home_intro />
        <div className='home-impact-wrapper'>
            <Impact/>
        </div>
    </div>)
}