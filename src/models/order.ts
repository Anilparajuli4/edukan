import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";



@Table({
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true
})


class Order extends Model{
    @Column({
        primaryKey :true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id:string

        @Column({
        type: DataType.STRING,
        allowNull: false

    })
    declare productNumber: string


    @Column({
        type: DataType.TEXT,
        allowNull: false

    })
    declare shippingAddress:string

      @Column({
        type: DataType.FLOAT,

    })
    declare totalAmount:number

      @Column({
        type: DataType.ENUM('pending', 'cancelled', 'delevired', 'ontheway', 'preperation'),
        defaultValue: 'pending'

    })
    declare orderStatus:string

     

}


export default Order