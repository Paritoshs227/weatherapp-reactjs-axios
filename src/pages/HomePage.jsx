import axios from 'axios';
import { useState } from 'react';
import InputBox from '../components/InputBox';
import ButtonComp from '../components/ButtonComp';

const HomePage = () => {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [cityName, setCityName] = useState('');
    const [flag, setFlag] = useState(false);
    const [inputErr, setInputErr] = useState(false);
    const [locName, setLocName] = useState('');
    const [country, setCountry] = useState('');
    const [feelsLike, setFeelsLike] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [temp, setTemp] = useState(0);
    const [weatherType, setWeatherType] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('01d');
    const [windDeg, setWindDeg] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [currDate, setCurrDate] = useState(0);
    const base_url ="/weatherapp-reactjs-axios";

    const getCurrLocation = () => {
        alert('hi')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        else{
            alert('Geolocation is not supported by this browser.')
        }
    };

    const success = (pos) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=5b00fa05bdd29b71514194f470147e2a&units=metric`)
            .then(response => {
                console.log('navigator api', response.data);
                setValues(response.data);
                setCityName('');
                setFlag(true);
                setInputErr(false);
            })
            .catch(err => console.log('axios error::', err));
    }
    const error = (error) => {
        console.log('Navigator api::', error);
        alert('error',error)
    }

    const formHandler = (e) => {
        e.preventDefault();
        if ((lat === 0 && lon === 0) &&  cityName === '') {        
                setInputErr(true);             
        }
        else {
            setInputErr(false);
            getWeatherData();
        }

    }

    const getWeatherData = async () => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName ? cityName : ''}&lat=${lat}&lon=${lon}&appid=5b00fa05bdd29b71514194f470147e2a&units=metric`)
            .then(response => {
                console.log(response.data);
                setValues(response.data);
                setFlag(true);
            })
            .catch(err => console.log('axios error::', err));
    }

    const setValues = (data) => {
        setLocName(data.name);
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setFeelsLike(data.main.feels_like);
        setHumidity(data.main.humidity);
        setTemp(data.main.temp);
        setWeatherType(data.weather[0].main);
        setWeatherDesc(data.weather[0].description);
        setWeatherIcon(data.weather[0].icon);
        setWindDeg(data.wind.deg);
        setWindSpeed((data.wind.speed * 3.6).toFixed(2));
        setSunrise(utcToDate(data.sys.sunrise));
        setSunset(utcToDate(data.sys.sunset));
        setCountry(data.sys.country);
        setCurrDate(utcToDate(data.dt));
    }

    const utcToDate = (utctime) => {
        return new Date(utctime * 1000).toLocaleTimeString();
    }

    return (
        <div className='w-full sm:w-1/2   mx-auto'>
            <div className='flex items-center '>
                <form className="w-2/3  py-3 px-2" onSubmit={formHandler}>
                    <InputBox label="Latitude:-" inputType="tel" inputVal={lat} onInputChange={(val) => setLat(val)} inputContainerCss="w-full flex justify-between mb-3 item-center" inputCss="rounded px-3 w-3/5 outline-none" labelCss="w-2/5 font-bold text-white text-xs" />
                    <InputBox label="Longitude:" inputType="tel" inputVal={lon} onInputChange={(val) => setLon(val)} inputContainerCss="w-full flex justify-between mb-3 item-center" inputCss="rounded px-3 w-3/5 outline-none" labelCss="w-2/5 font-bold text-white text-xs" />
                    <h2 className=' font-bold text-white text-center mb-3'>OR</h2>
                    <InputBox label="City Name:" inputType="text" inputVal={cityName} onInputChange={(val) => setCityName(val)} inputContainerCss="w-full flex justify-between mb-3 item-center" inputCss="rounded px-3 w-3/5 outline-none" labelCss="w-2/5 font-bold text-white text-xs" />
                    <ButtonComp buttonType="submit" btnCss="border rounded border-blue-600 bg-blue-600 text-white w-full outline-none" btnText="Submit" />
                </form>
                <h2 className=' font-bold text-white text-center mx-auto'>OR</h2>
                <ButtonComp buttonType="button" btnCss="border rounded border-blue-600 bg-blue-600 text-white outline-none px-3 py-2" onBtnClick={getCurrLocation} btnText="Lat Lon" />
                {/* <img src={`${base_url}/assets/location.png`} className='w-10 me-5 ' onClick={getCurrLocation} /> */}

            </div>
            {inputErr && (
                <div className='border-t-2 '>
                    <div className='text-center text-red-600 text-xl'>
                        Enter Either City Name or Lat Lon.
                    </div>
                </div>
            )}

            {flag ? (<div className='border-t-2 '>
                <div className='text-center'>
                    <h2 className='text-white text-2xl mt-3'>{locName},{country}</h2>
                    <h2 className='text-white text-sm'>{currDate}</h2>
                    <div className='flex items-center'>
                        <div className='w-2/5'>
                            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
                        </div>
                        <div className='w-3/5'>
                            <h1 className='text-white text-lg font-bold'>{temp} &deg;C</h1>
                            <h1 className='text-white text-lg'>{weatherType}</h1>
                            <h1 className='text-white text-sm capitalize '>{weatherDesc}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-1/2'>
                        <h4 className='text-white text-sm'>Feels Like : {feelsLike} &deg;C</h4>
                        <h4 className='text-white text-sm'>Wind : {windDeg} &deg;</h4>
                        <h4 className='text-white text-sm'>Sunrise : {sunrise}</h4>

                    </div>
                    <div className='w-1/2'>
                        <h4 className='text-white text-sm'>Humidity : {humidity}%</h4>
                        <h4 className='text-white text-sm'>Wind Speed : {windSpeed}km/h</h4>
                        <h4 className='text-white text-sm'>Sunset : {sunset}</h4>
                    </div>

                </div>
            </div>
            ) : null}

        </div>
    )
}

export default HomePage