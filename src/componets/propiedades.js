
export default function Propiedades(props) {
    return(
        <div>
        <h2>Propiedades</h2>
        <ul>
            <li>{props.number}</li>
            <li>{props.cadena}</li>
            <li>{props.boolean?"verdadero":"false"}</li>
            <li>{props.arreglo}</li>
            <li>{props.objeto.nombre}</li>
            <li>{props.objeto.apellido}</li>
            <li>{props.elemetReact}</li>
            <li>{props.arreglo.map(props.funcion)}</li>
            <li>{props.componenteReact}</li>
                
        </ul>
        </div>
    );
}