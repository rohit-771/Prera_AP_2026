import Number from './numbers_card';
import '../CSS/About.css';

export default function Impact(){
    return (<div id="impact-div">
        <h1 style={{color:'white',marginBottom:'5px',fontWeight:'light'}}>Our Impact in Numbers</h1>
        <h3 style={{color:'rgb(187, 184, 184)',fontWeight:'lighter',marginTop:'5px'
            ,marginBottom:'20px'}}>Delivering results that matter</h3>

        <div className='impact-numbers-grid'>
            <Number number={'25+'} message={"Events Organized"}/>
            <Number number={'20+'} message={"Brands Partnered"}/>
            <Number number={'500+'} message={"Audience reached"}/>
            <Number number={'95%'} message={"Client Satisfaction"}/>
        </div>
    </div>)
}