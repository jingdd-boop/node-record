const { Sequelize,DataTypes,Model } = require('sequelize');

const sequelize = new Sequelize('dormitory', 'root', '12345678', {
    host: 'localhost',
    dialect: "mysql",
    port: '3306',
  });


  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const User = sequelize.define('User', {
    // 在这里定义模型属性
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull 默认为 true
    }
  }, {
    // 这是其他模型参数
  });

  // `sequelize.define` 会返回模型
  console.log(User === sequelize.models.User); // true

  // 在上面的示例中,Sequelize 是指库本身
  // 而 sequelize 是指 Sequelize 的实例,它表示与一个数据库的连接.

  class User1 extends Model {}

  User1.init({
    // 在这里定义模型属性
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull 默认为 true
    }
  }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User1' // 我们需要选择模型名称
  });

  // 定义的模型是类本身
  console.log(User1 === sequelize.models.User1); // true


