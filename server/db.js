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
// 用户列表
const account = sequelize.define(
  // tablename
  'account',
  {
    'user_name': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'pwd': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'email': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'avatar': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'user_info': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'user_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false,
      'unique': true
    },
    'create_temp': {
      'type': Sequelize.DATE,
      'defaultValue': Sequelize.NOW,
    },
    'user_fans': {
      'type': Sequelize.INTEGER,
      'allowNull': true
    }
  }
)
account.sync();

// 评论列表
const guestbook = sequelize.define(
  'guestbook',
  {
    'poetrylist_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    },
    'guest_count': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'user_id': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'references': {
        'model': 'accounts',
        'key': 'user_id'
      }
    },
    'guest_time': {
      'type': Sequelize.DATE,
      'defaultValue': Sequelize.NOW
    },
    'star_num': {
      'type': Sequelize.BIGINT,
      'allowNull': true
    },
    'transpond': {
      'type': Sequelize.BIGINT,
      'allowNull': true
    }
  }
)
guestbook.sync();

// 博文列表
const poetrylist = sequelize.define(
  'poetrylist',
  {
    'content': {
      'type': Sequelize.TEXT,
      'allowNull': false
    },
    'create_temp': {
      'type': Sequelize.DATE,
      'defaultValue': Sequelize.NOW
    },
    'star': {
      'type': Sequelize.BIGINT,
      'allowNull': false
    },
    'recommend': {
      'type': Sequelize.BIGINT,
      'allowNull': false
    },
    'poetrylist_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    },
    'user_id': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'references': {
        'model': 'accounts',
        'key': 'user_id'
      }
    }
  }
)
poetrylist.sync();

// account
// account.hasMany(guestbook,{foreignKey: 'user_id', targetKey: 'user_id'});



sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


module.exports = sequelize