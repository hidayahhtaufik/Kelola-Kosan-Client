import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
    console.log("MASUK PROTECTED ROUTE")
    return (
        <Route {...rest} render={
            (props) => {
                if(localStorage.getItem("access_token")) {
                    return <Component {...props} />
                } else {
                    console.log("HARUSNYA SIH REDIRECT")
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}

export default ProtectedRoute;