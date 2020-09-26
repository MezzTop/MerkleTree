import export1 from './export.json'
import { writeFileSync } from 'fs'

console.log(typeof export1)

let export2: { [key: string]: number } = export1

// const exportObject = JSON.parse(export1)

for (const [key, value] of Object.entries(export2)) {
  export2[key] = value * 10e18
}

console.log(export2)

writeFileSync('./export2.json', JSON.stringify(export2))
