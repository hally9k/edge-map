import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import './App.css';

interface LatLng {
  lat: number,
  lng: number
}
interface Props {
  google: any
}

interface Device extends LatLng {
  device: string
}

const CENTER: LatLng = {
  lng: 174.76604461669922,
  lat: -36.853526940982796
}

function App({ google }: Props) {
  const [map, setMap] = useState<any>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const [trackerName, setTrackerName] = useState<string>('')
  const [tracker, setTracker] = useState<Device | null>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (trackerName) {
        try {
          fetch(`https://lqltw7pnb3.execute-api.ap-southeast-2.amazonaws.com/alpha?tracker=${trackerName}`)
            .then(response => response.json())
            .then(({ data }) => {
              setTracker((prevValue) => {
                if (!prevValue || data.device !== prevValue.device) {
                  if (map) {
                    map.panTo(data)
                  }

                  return data
                }

                prevValue.lat = data.lat
                prevValue.lng = data.lng

                return prevValue
              })
            });
        } catch (e) { }
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [map, trackerName])

  return (
    <div className="App">
      <div className="wrapper">
        <input className="tracker-input" onChange={({ currentTarget: { value } }) => setInputValue(value)} />
        <button className="tracker-button" onClick={() => setTrackerName(inputValue)}>Track</button>
      </div>
      <Map onReady={(_, map) => setMap(map)} google={google} initialCenter={CENTER} zoom={13} disableDefaultUI={true}
      >
        {tracker &&
          <Marker position={tracker} title={tracker.device} ></Marker>
        }
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYw9p2ubyPqqK98y_g-uXWY-Dxvs8GXAY'
})(App)
