# WebSocket 聊天伺服器

一個基於 Node.js 和 WebSocket 技術的即時聊天伺服器，支援多用戶即時通訊、用戶加入/離開通知，以及線上人數統計。

## 功能特色

- 🔄 **即時通訊**：使用 WebSocket 技術實現即時雙向通訊
- 🔄 **多用戶支援**：支援多個用戶同時連線聊天
- 📊 **線上人數統計**：即時顯示當前線上用戶數量
- 🔄 **用戶識別**：每個用戶都有唯一的 UUID 和自定義暱稱
- 🔄 **時間戳記**：所有訊息都包含精確的時間戳記
- 🔄 **系統通知**：自動通知用戶加入和離開事件

## 技術架構

- **Node.js** - 伺服器運行環境
- **ws** - WebSocket 伺服器庫
- **uuid** - 生成唯一用戶識別碼
- **ES Modules** - 使用現代 JavaScript 模組系統

## 安裝與設定

### 前置需求

- Node.js (建議版本 23.0.0 或以上)
- npm

### 安裝步驟

1. clone 專案到本地：

```bash
git clone <repository-url>
cd webSocket-server
```

2. 安裝依賴套件：

```bash
npm install
```

3. 啟動伺服器：

```bash
npm start
```

伺服器將在 `http://localhost:8080` 啟動。
目前正式環境部署在 RailWay 線上雲端平台：`https://railway.com/`
