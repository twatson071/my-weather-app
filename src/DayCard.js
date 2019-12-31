import React from 'react';
import apiConfig from './apiKeys'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody
} from "shards-react";
import moment from 'moment'

const DayCard = ({ reading }) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000;
    newDate.setTime(weekday);
    const imgURL = `owf owf-${reading.weather.id} owf-5x`
    fetch(`https://api.unsplash.com/search/photos/?client_id=${apiConfig.unplashedkey}&per_page=500&query='${reading.weather[0].description}'`)
    .then(res => res.json())
    .then(data => {
        const pagesTotal = data.total_pages;
        const imgUrl = data.results[Math.floor(Math.random()*data.results.length)].urls.full;
        fetch(`https://api.unsplash.com/search/photos/?client_id=${apiConfig.unplashedkey}&per_page=500&query=${reading.weather[0].description}&page=${getRandomPage(pagesTotal)}`)
        .then(res2 => res2.json())
        .then(data2 => {
        if(data2){
        const imgUrl2 = data2.results[Math.floor(Math.random()*data.results.length)].urls.full;
        document.body.style.backgroundImage = `url(${imgUrl2})`;
    }  else {
        document.body.style.backgroundImage = `url(${imgUrl})`;
    }
        
    })
    });
    let getRandomPage = (pagesTotal) =>
    {
        return(Math.floor(Math.random()*pagesTotal))
    }
    return (
        <Card id="weather" style={{ width: "100%", margin: "10px" }}>
            <CardHeader>{moment(newDate).format("dddd").toLowerCase()}</CardHeader>
            <i className={imgURL}></i>
            <CardBody>
                <CardTitle>{Math.round(reading.main.temp)}°F</CardTitle>
                <p>{reading.weather[0].description}</p>
            </CardBody>
        </Card>
    )
}

export default DayCard;