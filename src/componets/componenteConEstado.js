import React, {Component} from 'react';
function StateChildren(props){
    return(
        <div>
            <h3>{props.conteinChilds}</h3>
        </div>
    )    
}

export default class Estado extends Component {
    constructor(props) {
        super(props);
        this.state={
            contador:0
        }
        /*
            setInterval(() => {
            this.setState({
                contador : this.state.contador +1
            })
        },2000);
        */
    }
    render(){
        return(
                <div>
                    <p>{this.state.contador}</p>
                    <StateChildren conteinChilds={this.state.contador}></StateChildren>
                </div>
                          
        )
    }
}
