// const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', 
    { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nama: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        alamat: {
          type: DataTypes.STRING(100),
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
        tableName:'users'
    });

    return Users;
}