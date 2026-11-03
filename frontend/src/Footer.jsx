import './Footer.css'
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';


export default function Footer(){
    return (<div className='foot'>

        <div style={{width:'170px',color:'rgba(151, 149, 149, 1)',lineHeight:'20px'}}>
            <h1 style={{color:'white'}}>PRERA</h1>
            <p>Students building together — innovation, community & real impact.</p>
        </div>

        <div style={{color:'rgba(151, 149, 149, 1)',lineHeight:'12px'}}>
            <h2 style={{color:'white'}}>Adress</h2>
            <p>Rishihood University</p>
            <p>NH-44 , Sonipat </p>
            <p>Harayana-131029</p>
        </div>

        <div style={{color:'rgba(151, 149, 149, 1)',lineHeight:'16px'}}>
            <h2 style={{color:'white'}}>Contact</h2>
            <p>team.prera@gmail.com</p>
            <p>+91 7404972825</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '18px', fontSize: '24px' }}>
                <a href="https://www.linkedin.com/company/preraofficial/?viewAsMember=true" style={{ color: 'inherit', textDecoration: 'none' }} target='_blank'><FaLinkedin /></a>
                <a href="https://www.instagram.com/prera_official?igsh=emNlb3UyNDRzZmdx" style={{ color: 'inherit', textDecoration: 'none' }} target='_blank'><FaInstagram /></a>
            </div>
        </div>
    </div>)
}