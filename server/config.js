module.exports = {
  database:
  'mongodb://zhoujing:zhoujing123@127.0.0.1:27017/amazonCloneWebApplication',
    // 'mongodb://arash:abc123@ds111638.mlab.com:11638/amazonowebapplication',
  port: 5555,
  secret: 'zhoujingjingzhou'  //used for encrypt token
};

// db.createUser(
//     {
//       user: "zhoujing",
//       pwd: "zhoujing123",
//       roles: [ {role: "readWrite", db: "amazonCloneWebApplication" }]
//     }
// //   );
// use foo

// db.createUser(
//   {
//     user: "simpleUser",
//     pwd: "simplePass",
//     roles: [ { role: "readWrite", db: "foo" },
//              { role: "read", db: "bar" } ]
//   }
// )

// 现在我们有了一个普通用户
// 用户名：simpleUser
// 密码：simplePass
// 权限：读写数据库 foo， 只读数据库 bar。
