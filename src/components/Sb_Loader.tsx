type Prop = {off?:boolean, full?:boolean}

export default function Sb_Loader (prop:Prop) {
  var {off = false, full = false} = prop;
  return (
    <>
    {
      !full ? <div style={{'display': off ? 'none':'flex', 'width':'30px', 'justifyContent':'center'}}>
      <span style={{'left':'-30px'}} className='mini-loader'></span>
    </div> : <div style={{'height': '70vh', 'display':'flex'}}>
      <span className='loader'></span>
    </div>
    }
    
    </>
  )
}