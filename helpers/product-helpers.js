var db =  require('../config/connection')
var collection = require('../config/collections')

module.exports={

    addProduct:(product, callback)=>{
        //console.log(product)
        db.get().collection(collection.PRODUCT_COLLECTION).insert(product).then((data)=>{
                console.log(data)
                console.log(product)
                let id = product._id
                //console.log('id : ' +id )
                callback(id)
        })        
    },

    getAllProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
   

}