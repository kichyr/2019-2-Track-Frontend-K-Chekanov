import React from 'react'
import RussiaMap from './map/RussiaMap'
import * as DataDef from './map/utils'
import './App.css'

const App: React.FC = () => {
  const geojson: DataDef.GeoJson = DataDef.getGeojson()
  // console.log(geojson);

  return (
    <div className="App">
      <h1>COVID-19 MAP</h1>
      <h2>Shows live COVID-19 data by countruies</h2>
      <RussiaMap geoJson={geojson} width={800} height={600} />
    </div>
  )
}

export default App
