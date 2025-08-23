import type { Request, Response } from "express";
import Category from "../models/category.js"

class CategoryController{
    categoryData = [
  { categoryName: "Electronics" },
  { categoryName: "Fashion" },
  { categoryName: "Home & Kitchen" },
  { categoryName: "Beauty & Personal Care" },
  { categoryName: "Sports & Outdoors" },
  { categoryName: "Health & Wellness" },
  { categoryName: "Books" },
  { categoryName: "Toys & Games" },
  { categoryName: "Automotive" },
  { categoryName: "Groceries" },
  { categoryName: "Furniture" },
  { categoryName: "Jewelry & Accessories" },
  { categoryName: "Shoes & Footwear" },
  { categoryName: "Watches" },
  { categoryName: "Pet Supplies" },
  { categoryName: "Baby Products" },
  { categoryName: "Office Supplies" },
  { categoryName: "Musical Instruments" },
  { categoryName: "Garden & Outdoor" },
  { categoryName: "Tools & Hardware" }
    ]
    async seedCategories():Promise<void>{
        const datas = await Category.findAll()
        if(datas.length === 0) {
        await  Category.bulkCreate(this.categoryData)
        console.log("categories seeded successfully");
        
        }else{
            console.log("categories already seeded");
            
        }
   
    }

    public static async addCategory(req:Request, res:Response):Promise<void>{
        const {categoryName}= req.body()
        if(!categoryName){
            res.status(400).json({
            message: 'please provide category name'
        })
        } 
        await Category.create({
            categoryName
        })

        res.status(200).json({
            message: "category added successfully"
        })
    }

    public static async getCategory (req:Request, res:Response): Promise<void>{
        const data = Category.findAll()
        res.status(200).json({
            message: 'category fetched',
            data
        })
    }

    public static async deleteCategory(req:Request, res:Response): Promise<void>{
        const {id}= req.params
        const data = await Category.findAll({
            where:{
                id
            }
        })

          if(data.length === 0){
            res.status(200).json({
                message: 'no category with this id '
            })
          }else{
            await Category.destroy({
                where:{
                    id
                }
            })
            res.status(200).json({
                message: 'sucessfully deleted category'
            })
          }
    }

    public static async updateCategory(req:Request, res:Response):Promise<void>{
        const id = req.params.id
        const {categoryName} = req.body
        await Category.update({categoryName}, {
            where:{
                id
            }
        })

        res.status(200).json({
            message: 'category updated successfully'
        })
    }
  
}


export default CategoryController