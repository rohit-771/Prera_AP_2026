import '../CSS/Home.css';
import { Link } from 'react-router-dom';


export default function Home_intro() {
    return (<div id='Home_intro'>
        <h4 id='tagline'>An Event Enablement Platform</h4>
        <h1 className='home-heading' style={{ color: 'white' }}>Your Vision Deserves</h1>
        <h1 className='home-heading-gold'>
            The Right Partners</h1>

        <p className='home-desc'>We don't just connect you with sponsors, we become
            your partner. From event strategy to execution,
            <span style={{ fontWeight: 'Bold', color: 'white' }}> Prera </span>
            transforms your vision into a experience that brands compete to be part of.</p>

        <Link to='/connect' id='Partner-organizer-button'>I am a Organizer</Link>
        <Link to='/connect' id='Partner-brand-button'>I am a Brand</Link>
    </div>)
}