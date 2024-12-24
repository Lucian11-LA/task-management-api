module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT
        },
        completed:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'User',
                key: 'id'
            }
        }

    });

    return Task;
}