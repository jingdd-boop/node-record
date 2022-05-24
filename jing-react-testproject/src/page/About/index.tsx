import React from "react"

class About extends React.Component<any,any>{
  constructor(props: number){
    super(props)
    this.state={
        number:0
    }
}
handerClick=()=>{
   for(let i = 0 ;i<5;i++){
       setTimeout(()=>{
           this.setState({ number:this.state.number+1 })
           console.log(this.state.number)
       },1000)
   }
}

render(){
    return <div>
        <button onClick={ this.handerClick } >num++</button>
    </div>
}
}

export default About;