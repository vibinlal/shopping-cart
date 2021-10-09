var db =  require('../config/connection')
var collection = require('../config/collections')
var ObjectId = require('mongodb').ObjectID;

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

    getAllProduct: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },

    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).remove({_id:ObjectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    getProductDetail: (prodId) => {        
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })
    },

    updatetProduct: (prodId, proDetail) => {   
        
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:ObjectId(prodId)}, {
                $set :{
                    name: proDetail.name,
                    category: proDetail.category,
                    description: proDetail.description,
                    price: proDetail.price,
                    imageExtention: proDetail.imageExtention,
                    modiOn : new Date()
                }
            }).then((product)=>{
                resolve(prodId)
            })
        })
    }

   

}