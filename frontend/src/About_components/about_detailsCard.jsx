import '../CSS/About.css'

export default function AboutDetailsCard({heading,content}) {
    return (<div id='detail_card'>
        <h1 style={{color:'white'}}>{heading}</h1>
        <p style={{color:'white',fontSize:'18px',color:'rgb(187, 184, 184)'}}> {content}</p>
    </div>)
} 