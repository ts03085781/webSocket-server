// 導入 WebSocket 伺服器模組
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

// 創建一個新的 WebSocket 伺服器，監聽 8080 端口
const wss = new WebSocketServer({ port: 8080 });

// 廣播函數：向所有連線的客戶端發送訊息
function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      // 1 表示連線狀態為 OPEN
      client.send(message);
    }
  });
}

// 獲取當前連線人數的函數
function getConnectedCount() {
  let count = 0;
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      count++;
    }
  });
  return count;
}

// 監聽客戶端連線事件
wss.on('connection', (ws, req) => {
  const userId = uuidv4();

  // 從 URL 參數取得 sender
  const url = new URL(req.url, 'http://localhost');
  const sender = url.searchParams.get('sender');

  // 將 sender 存到 ws 物件上
  ws.sender = sender;

  // 連線成功時廣播新用戶加入的訊息
  broadcast(
    JSON.stringify({
      type: 'join',
      onlineUsers: getConnectedCount(),
      id: userId,
      sender: ws.sender,
      message: '',
      timestamp: new Date().toISOString(),
    })
  );

  // 發送歡迎訊息給新連接的用戶
  ws.send(
    JSON.stringify({
      type: 'userId',
      onlineUsers: getConnectedCount(),
      id: userId,
      sender: 'system',
      message: '',
      timestamp: new Date().toISOString(),
    })
  );

  // 監聽 WebSocket 錯誤事件
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // 監聽客戶端發送的消息
  ws.on('message', (data) => {
    const messageString = data.toString();
    broadcast(
      JSON.stringify({
        type: 'message',
        onlineUsers: getConnectedCount(),
        id: userId,
        sender: ws.sender,
        message: messageString,
        timestamp: new Date().toISOString(),
      })
    );
  });

  // 監聽客戶端斷開連線事件
  ws.on('close', () => {
    broadcast(
      JSON.stringify({
        type: 'close',
        onlineUsers: getConnectedCount(),
        id: userId,
        sender: ws.sender,
        message: '',
        timestamp: new Date().toISOString(),
      })
    );
  });
});
