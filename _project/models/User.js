 
    module.exports = (sequelize, DataTypes) => {
        const User = sequelize.define(User,
            {
    id: {
        name: id,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
            {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'users'
});
            User.associate = function (models) {}

            return User;
    } 
