import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This app will detect faces in your images. Give it a go!'}
            </p>
            <div>
                <div className="form pa3 br3 shadow-5 w-70 center">
                    <input type="text" className="f4 pa2 w-70 center" placeholder="Enter an image url here..." onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;