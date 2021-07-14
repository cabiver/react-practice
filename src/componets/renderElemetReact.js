import React, {Component} from 'react';
import data from '../helpers/data.json'

function ElementsList(props) {
    
    return (
      <li>
        <a  href={props.el.web} target="_blank" rel="noreferrer">{props.el.name}</a>
      </li>
    )
  }
export default class RenderElemetReact extends Component {
    constructor(props){
        super(props);
        this.state = {
            seasons:["primavera","Verano","otoño","invierno"]
        }
    }
    render() {
        return(
            <div>
                <h2>
                    render elemets
                </h2>
                <ul>
                {this.state.seasons.map(el=>{
                    return <li key={el}>{el}</li>
                })}
                </ul>
                <hr></hr>
                <h3>Frameworks frondtends</h3>
                 <ul>
                    {data.frameworks.map(el=>{
                        //return <li key={el.name}>{ElementsList(el)}</li> 
                        return <ElementsList key={el.id} el={el}></ElementsList>
                    })}
                </ul>
            </div>
        )
    }
}