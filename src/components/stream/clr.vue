<template>
<div id="emotes">
  <img class="absemote" transition="tfade" v-for="emote in emotes" v-bind:src="emote.url" v-bind:style="emote.style">
</div>
</template>

<script>
import ReconnectableWebSocket from 'reconnectable-websocket'

let socket = new ReconnectableWebSocket('wss://' + window.location.hostname + '/ws/clr')

let innerEmotes = []

let id = 0

let emoteLength = 3500

let addEmote = function (emote) {
  let url = ''
  let scale = 3

  switch (emote.type) {
    case 'bttv': {
      url = 'https://cdn.betterttv.net/emote/' + emote.id + '/' + scale + 'x'
    } break

    case 'twitch': {
      url = 'https://static-cdn.jtvnw.net/emoticons/v1/' + emote.id + '/' + scale + '.0'
    } break

    case 'ffz': {
      url = 'http://cdn.frankerfacez.com/emoticon/' + emote.id + '/' + emote.max_scale
    } break

    case 'emoji': {
      url = 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.6/assets/png/' + emote.id + '.png'
    } break
  }

  let divWidth = emote.size_x * 2 * 2
  let divHeight = emote.size_y * 2 * 2

  let w = window
  let d = document
  let e = d.documentElement
  let g = d.getElementsByTagName('body')[0]
  let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
  let windowHeight = w.innerHeight || e.clientHeight || g.clientHeight

  let emoteData = {
    id: ++id,
    url: url,
    style: {
      'left': Math.random() * (windowWidth - divWidth) + 'px',
      'top': Math.random() * (windowHeight - divHeight) + 'px'
    }
  }

  innerEmotes.push(emoteData)
}

socket.onmessage = function (e) {
  if (typeof e.data === 'string') {
    let jsonData = JSON.parse(e.data)
    console.log(jsonData)
    if (jsonData['event'] !== undefined) {
      switch (jsonData['event']) {
        case 'new_box': {
          // add_random_box(jsonData['data']['color'])
        } break
        case 'emotes': {
          let numEmotes = 0
          jsonData['data']['emotes'].forEach(function (emote) {
            for (let x = 0; x < emote.count; ++x) {
              addEmote(emote)
              numEmotes++
            }
          })

          if (numEmotes > 0) {
            setTimeout(function () {
              for (let x = 0; x < numEmotes; ++x) {
                innerEmotes.shift()
              }
            }, emoteLength)
          }
        } break
        case 'notification':
          // add_notification(jsonData['data']['message'])
          break
        case 'timeout':
          /*
          add_notification('<span class="user">' + jsonData['data']['user'] + '</span> timed out <span class="victim">' + jsonData['data']['victim'] + '</span> EleGiggle')
          setTimeout(function() {
              play_sound('slap')
              }, 100)
              */
          break
        case 'play_sound':
          // play_sound(jsonData['data']['sample'])
          break
        case 'play_custom_sound':
          // play_custom_sound(jsonData['data']['url'])
          break
        case 'emote_combo':
          // refresh_emote_combo(jsonData['data']['emote'], jsonData['data']['count'])
          break
        case 'hsbet_new_game':
          // hsbet_new_game(jsonData['data']['time_left'], jsonData['data']['win'], jsonData['data']['loss'])
          break
        case 'hsbet_update_data':
          // hsbet_update_data(jsonData['data']['win'], jsonData['data']['loss'])
          break
        case 'show_custom_image':
          // show_custom_image(jsonData['data'])
          break
        case 'refresh':
        case 'reload':
          window.location.reload(true)
          break
      }
    }
  }
}

socket.open()

export default {
  data () {
    return {
      msg: 'Hello from Component A!',
      emotes: innerEmotes
    }
  }
}

console.log('asd')
</script>

<style>
img.absemote {
  position: absolute;
}
.tfade-enter {
  animation: fade-in 1s;
}

.tfade-leave {
  animation: fade-out 1s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.absemote-enter-active, .absemote-leave-active {
  transition: all 1s;
}
.absemote-enter, .absemote-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>
