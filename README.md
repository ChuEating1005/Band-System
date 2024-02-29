# Band System
NYCU Introduction to Database System Final Project - 樂團系統
## 功能
- 帳號管理，分為樂手以及樂團兩種帳號，並擁有各自的頁面
- 樂手可以創建個人帳號並向喜愛樂團發出申請
- 樂團帳號可以審核樂手入團申請並同意
- 搜尋功能，根據 Filter 勾選結果排出符合自己喜好的個人資料
## 本地端測試
請先在 `backend/.env` 中設定 AWS Database 的 endpoint，並執行 `backend/create_tables.py` 來建出各個 Schema。  
在 `frontend/src/App.js` 中的 `App()` 函數中裡把 url 設定成後端 Server 的 IP 位址。
### Build Backend Server
```
cd ./backend
pip install flask flask_cors python-dotenv flask_sqlalchemy psycopg2-binary
python app.py
```
### Build Frontend Server
```
cd ..
cd ./frontend
npm install
npm run start
```

