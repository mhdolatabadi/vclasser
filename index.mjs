import axios from 'axios'
import FormData from 'form-data'
import WebSocket from 'ws'
import utf8 from 'utf8'

const className = process.argv[2]
const nickname = process.argv[3]
let room_id = ''
let customer_id = ''

const formData = new FormData()
formData.append('customer', 'skyroom')
formData.append('gadget', 'Skyroom')
formData.append('action', 'FetchRoom')
formData.append('room', className)

const getRoomData = async () => {
  const { data } = await axios.post(
    `https://vc.sharif.edu/ch/${className}?${new Date().valueOf()}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    }
  )
  console.log(data.result)
  room_id = data.result.room_id
  customer_id = data.result.customer_id
}

const connectToSocket = async () => {
  await getRoomData()
  const ws = new WebSocket('wss://vc.sharif.edu/server?uuid=')
  ws.on('open', function open() {
    // ws.send('something')
  })
  ws.on('message', function message(data) {
    let res =
      data.toString() === 'imalive'
        ? data
        : JSON.parse(String.fromCharCode.apply(null, data.toJSON().data))

    console.log(res)
    if (res === 'imalive') {
      ws.send('iamalive')
    } else {
      console.log(res)
      switch (res[0] + res[1] + res[2]) {
        case 'suserready':
          ws.send(
            JSON.stringify([
              's',
              'user',
              'join',
              {
                origin: 'vc.sharif.edu',
                app_id: 697875,
                room_id,
                customer_id,
                username: '',
                password: '',
                nickname,
                platform: {
                  version: '12.4.9',
                  os: 1,
                  browser: 1,
                },
              },
            ])
          )
          break
        case 'schatmessage-new':
          const { nickname: nick, text } = res[3]
          console.log(utf8.decode(nick), utf8.decode(text))
          break
      }
    }
  })
}

connectToSocket()
