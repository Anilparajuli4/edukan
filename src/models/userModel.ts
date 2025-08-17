import {Table, Column, Model, DataType, CreatedAt} from 'sequelize-typescript'


@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
  
})

class User extends Model{
    @Column({
        primaryKey : true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,

    })

    declare id:string

    @Column({
        type: DataType.STRING,

    })
    declare userName: string


    @Column({
          type: DataType.ENUM('customer', 'admin'),
          defaultValue: 'customer',
          allowNull: false,
    validate: {
        isIn: [['customer', 'admin']] // This ensures only these two values are allowed
    }
    })
    declare role: string

    @Column({
        type: DataType.STRING,

    })
    declare email:string

    @Column({

        type:DataType.STRING
    })
    declare password:string
}

export default User
