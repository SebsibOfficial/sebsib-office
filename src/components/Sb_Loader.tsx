type Prop = {off?:boolean, full?:boolean, colored?:boolean}

export default function Sb_Loader (prop:Prop) {
  var {off = false, full = false, colored = false} = prop;
  return (
    <>
    {
      !full ? 
      <div style={{'display': off ? 'none':'flex', 'width':'30px', 'justifyContent':'center'}}>
        <div className={`mini-spinner rounded-circle ${colored ? `colored-spinner` : ``}`}>
        </div>
      </div> : 
      <div style={{'height': '70vh', 'display':'flex'}}>
        <div className="spinner rounded-circle">
        </div>
      </div>
    }
    
    </>
  )
}