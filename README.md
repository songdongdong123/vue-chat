# vue-chat

> 使用vue全家桶，搭配express和mysql和socket.io和一个事实聊天小项目

## Build Setup

``` bash
# install dependencies
npm install

# 运行npm run dev 之前先确保本机安装了mysql
mysql默认端口号3306

#这里使用mysql2和sequelize来操作数据库

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


<!-- 全局安装vue-cli -->
npm install -g vue-cli
<!-- 设置vue的webpack模板 -->
vue init webpack my-project
<!-- 进入项目 -->
cd my-project
<!-- 安装依赖 -->
npm install
<!-- 运行项目 -->
npm run dev

npm install express --save