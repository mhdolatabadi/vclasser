// const WebSocket = require('ws')
// const ws = new WebSocket('wss://vc.sharif.edu/server?uuid=')
// // sharifi 40
// // jahangir 157
// let appId = 0
// ws.on('open', function open() {
//   // ws.send('something')
// })

// console.log(process.argv.slice(2))

// ws.on('message', function message(data) {
//   console.log(data.toString())
//   res =
//     data.toString() === 'imalive'
//       ? data
//       : JSON.parse(String.fromCharCode.apply(null, data.toJSON().data))
//   console.log(res)
//   if (res === 'imalive') ws.send('imalive')
//   else if (res[1] === 'user' && res[2] === 'ready') {
//     appId = res[3]['id']
//     ws.send(
//       JSON.stringify([
//         's',
//         'user',
//         'join',
//         {
//           origin: 'vc.sharif.edu',
//           app_id: 549188,
//           room_id: '157',
//           customer_id: '1',
//           username: '',
//           password: '',
//           nickname: 'zabbat',
//           platform: {
//             version: '12.4.9',
//             os: 1,
//             browser: 1,
//           },
//         },
//       ])
//     )
//     ws.send(
//       JSON.stringify([
//         's',
//         'chat',
//         'message-new',
//         {
//           id: 1640191527794,
//           text: 'سلام',
//         },
//       ])
//     )
//   }
// })

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`)
  readline.close()
})
