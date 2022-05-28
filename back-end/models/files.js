module.exports = (sequelize, DataTypes) => {
    const Files = sequelize.define(
        "Files",
        {
            Fileid:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type:DataTypes.STRING,
            },
            category:{
                type:DataTypes.STRING,
            },
            data:{
                type:DataTypes.DATEONLY,
            },
            FileReff:{
                type:DataTypes.STRING,
            },
            userId:{
                type:DataTypes.INTEGER,
                defaultValue: 0,
            }
        },
        {
            freezeTableName: true,
            timestamps:false
        }
    );
    return Files;
};
  