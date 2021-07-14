import React, {Component} from 'react';

function Login(){
    return(
        <div>
            <h3>login</h3>
        </div>
    );
}

function LoginOut(){
    return(
        <div>
            <h3>loginOut</h3>
        </div>
    );
}

export default class Texto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session:true
        }
    }
    render(){
        return(
             <div>
                <h2> seciones</h2>
                    
                {this.state.session ? <Login/>:<LoginOut/>}
             </div>
        )
    }
}
