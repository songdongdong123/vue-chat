const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'vue_chat', // 数据库名
  'root',   // 用户名
  'root',   // 用户密码
  {
      'dialect': 'mysql',  // 数据库使用mysql
      'host': 'localhost', // 数据库服务器ip
      'port': 3306,        // 数据库服务器端口
      'define': {
          // 字段以下划线（_）来分割（默认是驼峰命名风格）
          'underscored': true
      }
  }
);

const account = sequelize.define(
  // tablename
  'account',
  {
    'username': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'pwd': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'email': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'avatar': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'desc': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'userid': {
      'type': Sequelize.CHAR(18),
      'allowNull': false,
      'unique': true
    },
    'create_temp': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'unique': true
    }
  }
)
account.sync();



sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


module.exports = account