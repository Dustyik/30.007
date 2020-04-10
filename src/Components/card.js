import React from "react"
import testing from "./download.jpeg"
import { useHistory } from "react-router-dom"
import { ButtonContainer } from "./utils/button"


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
    return (
        <div className="card text-center" >
            <div className="overflow">
                {/* <img src={testing} alt="testing image">
                </img> */}
            </div>

            <div className="card-body text-dark">
                <h4 className="text-title2">
                    {props.title}
                </h4>

                <p className="text-title2 text-secondary">
                    {props.text}
                </p>

                <p className="text-title2 text-secondary">
                    {props.powerlevel}
                </p>

                <p className="text-title2 text-secondary">
                    {props.waterlevel}
                </p>

                <ButtonContainer>
                    <span className="text-title2" style={{ fontSize: "12px" }} onClick={(e) => {
                        callback(props.deets, props.history)
                    }}>
                        <i className="iconwithinbutton" />
                            Visit Farm
                        </span>
                </ButtonContainer>


            </div>
        </div>

    )
}

export default Card