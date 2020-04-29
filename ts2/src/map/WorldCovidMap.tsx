import React, { useEffect } from 'react'
import * as DataDef from './utils'
import * as d3 from 'd3'

function isCountriesEqueal(name: string, country: DataDef.ICOVDCountryInfo) {
  if (name === 'USA') name = 'United States of America'
  return country.Country.toLowerCase() === name.toLowerCase() || country.Slug.toLowerCase() === name.toLowerCase()
}

// Resolves color by country name
async function getColorFunction(): Promise<(name: string) => string> {
  const covidSummary: DataDef.ICOVIDStatistic = await DataDef.getCOVIDStatistic()

  let maxConfirmed = 0
  covidSummary.Countries.forEach((country: DataDef.ICOVDCountryInfo) => {
    if (country.TotalConfirmed > maxConfirmed) {
      maxConfirmed = country.TotalConfirmed
    }
  })

  return (name: string): string => {
    for (const country of covidSummary.Countries) {
      if (isCountriesEqueal(name, country)) {
        return `rgb(${Math.floor(255 * Math.pow(country.TotalConfirmed / maxConfirmed, 1 / 5))}, 0, 0)`
      }
    }
    return `rgb(0, 0, 0)`
  }
}

async function generatePath(
  svg: d3.Selection<d3.BaseType, any, d3.BaseType, any>,
  countries: DataDef.GeoJson,
  path: d3.ValueFn<SVGPathElement, unknown, string | number | boolean | null>,
) {
  const colorResolver = await getColorFunction()

  svg
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', (d: any) => {
      return `${colorResolver(d.properties.name)}`
    })
  /*.on("mouseover",function(d) {
    	console.log("just had a mouseover", d);
    	d3.select(this)
      	.classed("active",true)
  	})
  	.on("mouseout",function(d){
    	d3.select(this)
      	.classed("active",false)
    }); */
}

type GlobeProps = {
  height: number
  width: number
  geoJson: DataDef.GeoJson
}

function Globe({ height, width, geoJson }: GlobeProps) {
  let projection = d3
    .geoEqualEarth()
    .scale(height * 2)
    .center(d3.geoPath().centroid(geoJson as d3.GeoPermissibleObjects))
    .clipAngle(0)
    .fitSize([width, height], (geoJson as unknown) as d3.ExtendedGeometryCollection<d3.GeoGeometryObjects>)

  let geoGenerator = d3.geoPath().projection(projection)
  let svgRef: any = React.createRef<SVGAElement>()

  useEffect(() => {
    generatePath(d3.select(svgRef.current), geoJson, geoGenerator as any)
  })

  return <svg ref={svgRef} className={'node'} width={width} height={height}></svg>
}

export default Globe
