import '../CSS/Events.css';

export default function Events({url,name,Collegename,Description,Date,Venue,Audience,link}){
    return(<div id='event_card'>
        <img id='img' src={url} alt={name} loading='lazy' />
        <h2 style={{color:'white',fontWeight:'bold',marginBottom:'5px'}}>{name}</h2>
        <h3 style={{color:'white',fontWeight:'bold',marginBottom:'5px',marginTop:'0px'}}>{Collegename}</h3>
        <p style={{color: 'rgb(187, 184, 184)',marginTop:'10px',marginBottom:'10px'}}>{Description}</p>

       <h4 className='deatils'>{Date}</h4>
       <h4 className='deatils'>{Venue}</h4>
       <h4 className='deatils' style={{marginBottom:'30px',marginTop:'0px'}}>{Audience}</h4>
        <a style={{color:'white'}} href={link} target='_blank' rel='noreferrer' title='Open event link' aria-label='Open event link'>↗</a>
       
    </div>)
}