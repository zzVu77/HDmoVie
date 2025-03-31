import { DataTypes, Model } from 'sequelize'
// import sequelize from "../config/database";

class User extends Model {
  public id!: number
  public username!: string
  public email!: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // sequelize,
    tableName: 'users',
  },
)

export default User
