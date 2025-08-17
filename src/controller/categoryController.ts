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
}


export default new CategoryController()