# Jewelry Pix

Jewelry Pix 是一個以 Vue 2 建置的飾品電商網站作品，提供商品瀏覽、分類篩選、購物車、優惠券、結帳與訂單付款流程；另包含需登入的後台，可管理商品、訂單與優惠券。

## 線上瀏覽

- 網站：[https://jack842248.github.io/jewelry-pix/](https://jack842248.github.io/jewelry-pix/)
- 原始碼：[https://github.com/jack842248/jewelry-pix](https://github.com/jack842248/jewelry-pix)

## 功能特色

- 首頁、品牌介紹、購物須知與飾品保養等內容頁面
- 耳環、戒指、項鍊、手鍊、耳夾耳環、水晶手環與 925 銀飾等商品分類
- 商品詳細資訊、購物車數量調整、優惠券套用、結帳與付款流程
- 管理後台：商品、訂單與優惠券管理
- 表單驗證、載入狀態與操作提示訊息

## 技術使用

- Vue 2
- Vue Router
- Vuex
- Axios
- Bootstrap 4、SCSS
- VeeValidate
- 六角學院 Vue 作品實戰 API

## 安裝與啟動

### 環境需求

- Node.js 6 以上
- npm 3 以上

### 安裝相依套件

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

啟動後，請在瀏覽器開啟 [http://localhost:8080](http://localhost:8080)。

### 建置正式版本

```bash
npm run build
```

建置完成的檔案會輸出至 `dist/` 目錄。

## 可用指令

| 指令            | 說明                       |
| --------------- | -------------------------- |
| `npm run dev`   | 啟動本機開發伺服器與熱更新 |
| `npm start`     | 等同於 `npm run dev`       |
| `npm run build` | 建置可部署的正式版本       |

## API 設定

專案的 API 位址設定於 `config/dev.env.js` 與 `config/prod.env.js`，目前使用六角學院 API。若要改用其他 API，請調整 `API_URL` 與 `CUSTOM_PATH` 的設定值。

## 專案結構

```text
src/
├── assets/       # 圖片與 SCSS 樣式
├── components/   # 可重複使用的前、後台元件
├── layouts/      # 前台、商店與後台版型
├── router/       # 路由設定與登入驗證
├── store/        # Vuex 狀態管理與 API 操作
└── views/        # 前台與後台頁面
```
