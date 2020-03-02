<template>
  <div id="app">
    <input type="text" v-model="myVar" />
    <button @click="clickButton(myVar)">Ping Server</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myVar: ''
    }
  },
  beforeCreate () {
    this.sockets.unsubscribe('chat_message')
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.sockets.subscribe('chat_message', data => {
        console.log('data', data)
        this.msg = data.message
      })
    },
    disconnect: function () {
      console.log('server disconnected')
      this.sockets.unsubscribe('chat_message')
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      )
    }
  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('customEmit', data)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
