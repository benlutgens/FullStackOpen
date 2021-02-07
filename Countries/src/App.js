import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])

   useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
        setCountries(response.data)
    })
   }, []) 

    return (
        <div>
            <Search countries={countries}/>
        </div>
    )
}

const Search = ({countries}) => {
    const [matchList, setMatchList] = useState([])

    const handleSearch = (event) => {

        setMatchList(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
        
    }

    return (
        <div>
            find countries 
            <input onChange={handleSearch}/>
            <MatchList matchList={matchList} />
        </div>
    )
}

const MatchList = ({matchList}) => {
    if (matchList.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (matchList.length > 1) {
        return matchList.map(match => <MatchItem key={match.name} match={match}/>)
    } else if (matchList.length === 1) {
        return <MatchItem match={matchList[0]} extra={true}/>
    }
    return <p>no matches</p>
}

const MatchItem = ({match, extra}) => {
    const [info, setInfo] = useState(extra)
    const [weather, setWeather] = useState([])
    const [response, setResponse] = useState(false)
    if (info) {
        if (response === false) {
            const weather_key = process.env.REACT_APP_API_KEY
            axios.get(`http://api.weatherstack.com/current?access_key=${weather_key}&query=${match.capital}`)
            .then(response => {
                setResponse(true)
                setWeather(response.data)
                console.log(response.data)
            })
        }
        
        //get api key
        //call api
        //set variables
        return (
            <>
                <h1>{match.name}</h1>
                <p>
                    capital: {match.capital}
                    <br/>
                    population: {match.population}
                </p>
                <h2>languages</h2>
                <ul>
                    {match.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={match.flag} alt={match.name + 'flag'}></img>
                <h2>Weather in {match.capital}</h2>
                <div>
                    <p><b>temperature:</b>{weather.temperature}</p>
                </div>
                <div>
                    <p><b>wind: </b>{weather.wind}</p>
                </div>
            </>
        )
        
    } 
    return (
    <>
    <p key={match.name}>{match.name}
        <button onClick={() => {setInfo(!info)}}>Show</button>
    </p>
    
    </>
    )
}
 
export default App