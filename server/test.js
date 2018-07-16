return sequelize.transaction(function (t) {

  // 要确保所有的查询链都有return返回
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(function (user) {
    return user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, {transaction: t});
  });

}).then(function (result) {
  // Transaction 会自动提交
  // result 是事务回调中使用promise链中执行结果
}).catch(function (err) {
  // Transaction 会自动回滚
  // err 是事务回调中使用promise链中的异常结果
});