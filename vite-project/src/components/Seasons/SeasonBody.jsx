
export default function SeasonBody(props) {

    return(
        <div>
            <img src= {props.image} className="season-img"></img>
            <h1>{props.title}</h1>
        </div>
    )
}