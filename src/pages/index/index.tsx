import { View, Text, Button } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useRef } from "react";
import awaitableWs from "awaitable-ws";

import "./index.scss";

export default function Index() {
  useLoad(() => {
    const url = "ws://127.0.0.1:9000/api";

    wsRef.current = new awaitableWs({ url, is_taro: true });

    //ping pong
    setInterval(() => {
      wsRef.current?.custom_send("ping");
    }, 5000);
  });

  const wsRef = useRef<awaitableWs>();

  const sendMsg = async () => {
    try {
      const sendObj = {
        data: "any message",
      };

      const res = await wsRef.current?.send<{ msg: string; id: number }>(
        sendObj
      );

      console.log(res);

      Taro.showModal({
        title: "recv message from server:",
        content: JSON.stringify(res),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="index">
      <Text>Hello awaitable-ws</Text>
      <Button onClick={sendMsg}>send message</Button>
    </View>
  );
}
