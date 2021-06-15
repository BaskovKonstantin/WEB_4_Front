import {useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"

import "./GraphForm.scss"
import {getValueOfR} from "../../redux/slice/formStateSlice"
import {fixedX, fixedY, pixelX, pixelY} from "../../service/validator/graph"
import {addNewPoint} from "../../service/request/point"
import {getLastPoint, setLastPoint} from "../../redux/slice/lastPointSlice";
import {getPoints, addPoint} from "../../redux/slice/pointStoreSlice";

export default function Figure(){
    const radius = useSelector(getValueOfR)
    let r = radius
    switch (r) {
        case 1:
            return (<g id = "figure" transform="scale(1)">
                <path id="area" d="M 199.5 197.5 v 165 a 195 195 90 0 0 162 -164 z H 39 L 199.5 362.5 V 39 H 279 V 201" />
            </g>)
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
    }
}