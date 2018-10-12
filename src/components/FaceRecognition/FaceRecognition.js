import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    return (
        <div className="center relative w-80 mt5">

                <img id="inputImage" src={imageURL} alt="" className="w-100"/>
                <div className="bounding-box" style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left }}></div>

        </div>
    )
}

export default FaceRecognition;