import Nav from '../Navbar.jsx'
import Intro from '../About_components/about_intro'
import AboutDetailsCard from '../About_components/about_detailsCard';
import AboutTeam from '../About_components/about-team'
import Impact from '../About_components/impact.jsx'

export default function About_page(){
    return(<div className='about-page-wrapper'>
    <Intro/>

    <Impact/>

    <div className='about-details-grid'>
    <AboutDetailsCard heading={'Our Mission'} content={'To empower event organizers by connecting them with brands that align with their vision, creating authentic partnerships that drive mutual success.'}/>

        <AboutDetailsCard heading={'Specialisation'} content={<ul>
            <li>Sponsor sourcing</li>
            <li>Brand collaborations</li>
            <li>Event partnerships</li>
            <li>Strategic growth planning</li></ul>} />

     <AboutDetailsCard heading={'Core Values'}  content={<ul>
            <li>We Connect the Right Dots</li>
            <li>We Build Strong Partnerships</li>
            <li>We Deliver Real Impact</li>
            <li>We Grow Together</li>
        </ul>} />
        
    <AboutDetailsCard heading={'Rapid Execution'} content={'From initial contact to event day, our streamlined processes ensure quick turnaround times without compromising on quality or attention to detail'}/>
        </div>

    <AboutTeam/>
    </div>)}

