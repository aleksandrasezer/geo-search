import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import s from './GeoList.module.css'


export const GeoList = () => {

    const {geoList, searchText} = useSelector((state: RootState) => state.geoList)
    const geoListToDisplay = geoList.length
        ? geoList.slice().sort((a,b) => a.name.indexOf(searchText) - b.name.indexOf(searchText))
        : geoList


    return (
        <div >
            {geoListToDisplay.map(l => <div key={l.geonameid} className={s.geoListCont}><div>{l.name}</div><div>{l.latitude},{l.longitude}</div></div>)}
        </div>
    );
}