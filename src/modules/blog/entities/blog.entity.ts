import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "blog", timestamps: true})
export class Blog extends Model<Blog> {
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @Column({type: DataType.STRING, allowNull: false})
    image: string
}
