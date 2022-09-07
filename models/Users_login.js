// const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Userslogin = sequelize.define('Userslogin', 
    { 
        id_user: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
    },{
        tableName:'users_login'
    });

    return Userslogin;
}