/* eslint-disable react/prop-types */
export default function ShowsBody(props) {
    return(
        <div onClick ={props.click}>
            <h3 className="title">{props.title}</h3>
            <img src={props.image} className="img"></img>
            <h4 className="seasons">Seasons: {props.seasons}</h4>
            <p className="">{props.description}</p>

            <h3>{props.genres}</h3>
            <p>{props.updated}</p>

        </div>
    )
}