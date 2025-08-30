const Product = require("./../db/product");

async function addProduct(model) {
    let product = new Product({
        ...model
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id , model) {
    await Product.findByIdAndUpdate(id,model);
}

async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
}

async function getAllProducts() {
    let product = await Product.find();
    return product.map(x => x.toObject());
}

async function getProduct(id) {
    let product = await Product.findById(id);
    return product.toObject();
}

async function getNewProducts() {
    let newProduct = await Product.find({
        isNewProduct:true
    })
    return newProduct.map((x)=>x.toObject());
}

async function getFeaturedProducts() {
    let featuredProduct = await Product.find({
        isFeatured:true
    })
    return featuredProduct.map((x)=>x.toObject());
}

async function getProductForListing(searchTerm,categoryId,brandId,page,pageSize,sortBy,sortOrder) {
   if(!sortBy){
    sortBy = "price";
   }
   if(!sortOrder){
    sortOrder = -1;
   }
    let queryFilter = {};
    if(searchTerm){
        queryFilter.$or = [
            {name : {$regex: '.*'+searchTerm+'.*'}},
            {shortDescription : {$regex: '.*'+searchTerm+'.*'}},
            {description : {$regex: '.*'+searchTerm+'.*'}}
        ]
    }
    if(categoryId){
        queryFilter.categoryId = categoryId;
    }
    if(brandId){
        queryFilter.brandId = brandId;
    }
    let productsForListing = await Product.find(queryFilter).sort({
        [sortBy] : +sortOrder
    }).skip((+page-1)*+pageSize).limit(+pageSize);
    return productsForListing.map((x)=>x.toObject());
}

module.exports = {getProduct,getAllProducts,deleteProduct,updateProduct,addProduct,getFeaturedProducts,getNewProducts,getProductForListing};