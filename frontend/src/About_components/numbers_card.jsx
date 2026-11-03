
export default function Numbers_card({number,message}){
    return (<div>
        <h1 style={{color:'gold',marginBottom:'0px',fontSize:'50px'}}>{number}</h1>
        <h3 style={{color:'rgb(187, 184, 184)',fontWeight:'lighter',marginTop:'5px',
            fontSize:'20px' }}>{message}</h3>
    </div>)
}