import React, {useState} from 'react'

const BaseForm = ({form, onclose,children}) => {

    return (
        <div className="form-modal" style={{
            display: form.mode && form.show ? 'block' : 'none'
        }}>
            <div className="form-wrapper forms-pop" style={{
                display: form.mode && form.show ? 'block' : 'none'
            }}>

                <div className="media">
                    <div className="media-body">
                        <span style={{
                            fontWeight: "bolder",
                            fontSize: "24pt",
                        }}>
                            {form.header}
                        </span>
                    </div>
                    <div className="media-right" style={{
                        paddingTop: "2.5%"
                    }}>
                        <a className="btn btn-primary square-btn form-close-btn" onClick={() => {
                            onclose()
                        }}>
                        <i className="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <br />
                {children}
            </div>
        </div>

    )

}

export default BaseForm