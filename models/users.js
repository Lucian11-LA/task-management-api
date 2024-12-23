module.exports  = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
            type: DatatTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },

        name: {
            type: DatatTypes.STRING,
            allowNUll: false
        },

        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return User;
}