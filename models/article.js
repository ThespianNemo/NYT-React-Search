const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const articleSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, require: true},
    title: {type: String, require: true},
    date: {type: Date, require: true},
    link: {type: String, require: true}
});

const Article = mongoose.model("Article", articleSchema);

module.export = Article;
