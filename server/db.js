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
      'allowNull': false,
      'defaultValue': 0
    },
    'attention': {
      'type': Sequelize.BIGINT,
      'allowNull': false,
      'defaultValue': 0
    },
    'poetry_num': {
      'type': Sequelize.BIGINT,
      'allowNull': false,
      'defaultValue': 0
    }
  }
)
account.sync();

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
      'allowNull': true
    },
    'recommend': {
      'type': Sequelize.BIGINT,
      'allowNull': true
    },
    'poetrylist_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    },
    'transmit_content': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'transmit_user_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': true
    },
    'transmit_user_name': {
      'type': Sequelize.STRING,
      'allowNull': true
    },
    'transmit_poetrylist_id': {
      'type': Sequelize.CHAR(255),
      'allowNull': true
    },
    'user_id': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'references': {
        'model': 'accounts',
        'key': 'user_id'
      }
    },
    'guest_num': {
      'type': Sequelize.BIGINT,
      'allowNull': true,
    }
  }
)
poetrylist.sync();


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

const supportlist = sequelize.define(
  // 点赞列表
  'supportlist',
  {
    'user_id': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'references': {
        'model': 'accounts',
        'key': 'user_id'
      }
    },
    'poetrylist_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    }
  }
)
supportlist.sync();

const attentionlist = sequelize.define(
  // 关注列表
  'attentionlist',
  {
    'user_id': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'target_id': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'isMyAttention': {
      'type': Sequelize.BOOLEAN,
      'defaultValue': true
    },
    'isMyFans': {
      'type': Sequelize.BOOLEAN,
      'defaultValue': false
    }
  }
)
attentionlist.sync();

const transmitlist = sequelize.define(
  // 转发列表
  'transmitlist',
  {
    'poetrylist_id': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    },
    'content': {
      'type': Sequelize.TEXT,
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
transmitlist.sync();


const chat = sequelize.define(
  // 转发列表
  'chat',
  {
    'chatid': {
      'type': Sequelize.TEXT,
      'allowNull': false
    },
    'form': {
      'type': Sequelize.STRING,
      'allowNull': false,
      'references': {
        'model': 'accounts',
        'key': 'user_id'
      }
    },
    'to': {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    'read': {
      'type': Sequelize.BOOLEAN,
      'defaultValue': false
    },
    'content': {
      'type': Sequelize.TEXT,
      'defaultValue': ''
    }
  }
)
chat.sync();

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


module.exports = sequelize