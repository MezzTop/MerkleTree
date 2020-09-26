import { program } from 'commander'
import fs from 'fs'
import path from 'path'
import { parseBalanceMap } from '../src/parse-balance-map'

// program
//   .version('0.0.0')
//   .requiredOption(
//     '-i, --input <path>',
//     'input JSON file location containing a map of account addresses to string balances'
//   )

// program.parse(process.argv)

function toMerkleTree(source: string) {
  fs.readdir(source, function (err, menu) {
    if (!menu) return
    menu.forEach(function (ele) {
      fs.stat(source + '/' + ele, function (err, info) {
        if (info.isDirectory()) {
          toMerkleTree(source + '/' + ele)
        } else {
          if (!ele.endsWith('.json')) {
            console.log(`${ele}不是json文件,跳过不处理！`)
            return
          }
          const json = JSON.parse(fs.readFileSync(source + '/' + ele, { encoding: 'utf8' }))
          fs.writeFileSync(source + '/' + ele, JSON.stringify(parseBalanceMap(json)))
          console.log(`${ele} 文件转换成功!`)
        }
      })
    })
  })
}

toMerkleTree('source')

// const json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }))

// if (typeof json !== 'object') throw new Error('Invalid JSON')

// console.log(JSON.stringify(parseBalanceMap(json)))
