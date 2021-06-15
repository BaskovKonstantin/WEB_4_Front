import {useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"

import "./GraphForm.scss"
import {getValueOfR} from "../../redux/slice/formStateSlice"
import {fixedX, fixedY, pixelX, pixelY} from "../../service/validator/graph"
import {addNewPoint} from "../../service/request/point"
import {getLastPoint, setLastPoint} from "../../redux/slice/lastPointSlice";
import {getPoints, addPoint} from "../../redux/slice/pointStoreSlice";
import DataTable from "./DataTable";

export default function GraphForm() {
  const dispatch = useDispatch()

  const [axisX, setAxisX] = useState(0)
  const [axisY, setAxisY] = useState(0)
  const [axisVisibility, setAxisVisibility] = useState("hidden")

  const radius = useSelector(getValueOfR)

  const graph = useRef()

  const showCoordinates = (e) => {
    let r = radius === 0 ? 2 : radius

    let pixelX = (e.clientX - graph.current.getBoundingClientRect().left) * 400 / graph.current.getBoundingClientRect().width
    let pixelY = (e.clientY - graph.current.getBoundingClientRect().top) * 400 / graph.current.getBoundingClientRect().height

    setValX((pixelX - 200) * 4 / 160)
    setValY((200 - pixelY) * 4 / 160)

    setAxisX((160 * valX) / 4 + 200)
    setAxisY(200 - (160 * valY) / 4)

    setAxisVisibility("visible")
  }

  const hideCoordinates = () => {

    setAxisVisibility("hidden")
  }

  const [valX, setValX] = useState(null)
  const [valY, setValY] = useState(null)

  const handleGraphClick = (e) => {
    e.preventDefault();

    if (radius > 0) {
      addNewPoint(valX, valY, radius).then(response => {
        if (response.ok) {
          response.json().then(point => {
            dispatch(addPoint(point))
            dispatch(setLastPoint(point))
          })
        }
      })
    }
  }

  const lastAddedPoint = useSelector(getLastPoint)
  const points = useSelector(getPoints)

  const frame = useRef();

  const [swtch, setSwtch] = useState(false)

  return (
    <div className="GraphForm">
      <div>
        <div className="Graph">
          <svg ref={graph} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"
               fill="none" strokeWidth="1" strokeLinecap="round"
               strokeLinejoin="round" onMouseMove={showCoordinates} onMouseLeave={hideCoordinates} onClick={handleGraphClick}>
           <g id = "figure" >
              <path id="area" d={"M 199.5 197.5 v "+(41.125*radius)+" a 195 195 90 0 0 "+ (41.125*radius) +" "+(-(41.125*radius))+" z "} />
               <rect id="area" x="197" y={(199.5-40.5*radius)} width={(21*radius)} height={(40.5 *radius)}/>
               <polygon id="area" points ={"199.5 197.5, "+(199.5 - (41.125*radius))+" 199.5 , 199.5 "+(197.5+41.125*radius)} />
            </g>
            <g id = "figure" transform={ "scale("+radius+")" }>

            </g>

            <path d="M0,200 h40 v3,-6,3 h80 v3,-6,3 h80 v-80 h3,-6,3 v-80 h3,-6,3 v-40 m0,0 l3,6,-3,-6,-3,6,3,-6 v200 h80 v3,-6,3 h80 v3,-6,3 h40 m0,0 l-6,3,6,-3,-6,-3,6,3 h-200 v80 h3,-6,3 v80 h3,-6,3 v40 v-200 h-200 z"/>

            <g opacity={swtch?"1":"0"} stroke="none" ref={frame}>{
              points.map((item) => {
                return <circle r={3} cx={pixelX(item.x, 4)} cy={pixelY(item.y, 4)} fill={item.status?"#55ffbe":"#7a1cbe"}/>
              })
            }</g>
            <line x1="5" y1={axisY} x2="395" y2={axisY} visibility={axisVisibility}/>
            <line x1={axisX} y1="5" x2={axisX} y2="395" visibility={axisVisibility}/>
            {/* last added point */}
            {lastAddedPoint != null && radius > 0 && <circle r="4" id="dot" cx={pixelX(lastAddedPoint.x, 4)} cy={pixelY(lastAddedPoint.y, 4)}/>}
            <text x="355" y="220" strokeWidth="0" fill="#000000">R</text>
          </svg>
          <span>{radius <= 0 && "Allowed only positive radius"}</span><br/>
        </div>
        <div >

        </div>
      </div>
      <div className="Frame">
        <label className="Switch">
          <input type="checkbox" checked={swtch} onChange={() => {setSwtch(!swtch)}}/>
          <span className="Slider Round"/>
        </label>
        <span>Show history of points</span>
      </div>
    </div>
  )
}
