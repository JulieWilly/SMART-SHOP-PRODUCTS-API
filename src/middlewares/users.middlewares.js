const validateUpdateDetails = ( res, req, next) =>{
    const {productThumbnail, productTitle, productDescription, productCost, onOffer} = req.body;
        if (!productThumbnail) return res.status(400).json({ success: false, message: "First name is required."})
        if (!productTitle) return res.status(400).json({ success: false, message: "Please enter a title."})
        if (!productDescription) return res.status(400).json({success: false, message: "Please enter a description"})
        if (!productCost) return res.status(400).json({ success: false, message: "Please enter product cost."})
        if (!onOffer) return res.status(400).json({ success: false, message: "Indicate if there is an offer or not."})
    
       
        next()
}

export default validateUpdateDetails;