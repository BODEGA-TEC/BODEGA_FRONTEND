import React from "react";
import './Text.css'

function Text(props){
    return (
        <div className={props.text_style}>
            <div className="text_containter" >
                <div className="text_wrapper">
                    <p>
                        {props.text}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Text;