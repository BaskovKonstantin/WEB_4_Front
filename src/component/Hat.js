import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux"

import "./Hat.scss"
import HomePage from "./home/HomePage"
import MainPage from "./main/MainPage"
import {selectAuth} from "../redux/slice/authValueSlice"

export default function Content() {
    const authValue = useSelector(selectAuth)

    return (
            <div className="Hat">
            Басков К.Д. && Головков М.С. P3232 Вариант 213952
        </div>
    )
}
