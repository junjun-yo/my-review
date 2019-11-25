export default {
  data() {
    return {
      $websocket: null
    };
  },
  beforeMount() {
    this.$initWebsocket();
  },
  beforeDestroy() {
    this.$websocket.close();
  },
  methods: {
    $initWebsocket: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.$websocket = new WebSocket(
          "ws://localhost:8081" + "/api/websocket/001"
        );
        // 监听socket连接
        this.$websocket.onopen = this.websocketOpen;
        // 监听socket错误信息
        this.$websocket.onerror = this.websocketError;
        // 监听socket消息
        this.$websocket.onmessage = this.websocketMessage;
        this.$websocket.onclose = this.websocketClose;
      }
    },
    $websocketOpen: () => {
      console.log("socket连接成功");
    },
    $websocketError: () => {
      console.log("连接错误");
    },
    $websocketMessage: msg => {
      console.log(msg.data);
    },
    $sendMessage: params => {
      this.$websocket.send(params);
    },
    $websocketClose: () => {
      console.log("socket已经关闭");
    }
  }
};
