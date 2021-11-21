import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGeoList, RootState, setSearchText} from "../store/store";
import {GeoList} from "./geo-list/GeoList";
import s from './Main.module.css'


export const Main = () => {

    const dispatch = useDispatch()
    const {searchText, serverError} = useSelector((state: RootState) => state.geoList)

    const [error, setError] = useState<boolean>(false)

    const isInvalidInput = (input: string) => {
        return (/[^a-zA-Z0-9\s]/.test(input) || input.length < 2)
    }
    const isValidInput = (input: string) => {
        return (/[a-zA-Z0-9\s]/.test(input) && input.length > 1)
    }

    const onInputChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value
        isInvalidInput(text) ? setError(true) : dispatch(setSearchText(text.toLowerCase()))
        isValidInput(e.currentTarget.value) && setError(false)
        isInvalidInput(text) && setError(true)
    })

    useEffect(() => {
        if (searchText.length) {
            dispatch(getGeoList())
        }
    }, [dispatch, searchText.length])


    return (
        <div>
            <div><h1>Search Great Britain locations</h1></div>
            {serverError
                ? <div className={s.serverError}>Server is not responding.. Please try again later.</div>
                : <div>
                    <div className={error ? s.errorInput : s.inputCont}>
                        <input onChange={onInputChange}/>
                    </div>
                    {error
                        ? <div style={{color: 'red'}}>Please enter min. 2 characters. Letters or numbers.</div>
                        : <GeoList/>}
                </div>
            }
        </div>
    )
}
