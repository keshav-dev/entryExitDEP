import React from "react";
import {Alert} from "react-bootstrap";

const ErrorMessage = ({variant="danger",children}) => {
    return(
        <Alert variant={variant} style={{color: "red",border: '1px solid red', padding:'1rem',fontSize:20,backgroundColor:'rgba(245, 177, 177, 0.4)'}} >
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage;