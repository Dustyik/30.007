import React from "react"
import testing from "./download.jpeg"
import { useHistory } from "react-router-dom"

const callback = (selectedpark, history) => {
    history.push({
    pathname: "/gallery",
    state: {
        id: selectedpark.location,
        lat: selectedpark.lat,
        long: selectedpark.long,
        postalcode: selectedpark.postalcode,
        name: selectedpark.name,
        powerlevel: selectedpark.powerlevel,
        waterlevel: selectedpark.waterlevel,
        hasstart: selectedpark.hasstart
    }
    })
    }

const Card = props => {
    return(
        <div className = "card text-center">
            <div className = "overflow">
                <img src = {testing} alt = "testing image">
                </img>
            </div>

            <div className = "card-body text-dark">
                <h4 className = "card-title">
                    {props.title}
                </h4>

                <p className = "card-text text-secondary">
                     {props.text}
                </p>

                <p className = "card-text text-secondary">
                     {props.powerlevel}
                </p>

                <p className = "card-text text-secondary">
                     {props.waterlevel}
                </p>

                <a href="" className = "btn btn-outline-sucess" onClick = {(e) => {
                    callback(props.deets, props.history)}}>
                    Visit Gallery
                </a>


            </div>
        </div>

    )
}

export default Card