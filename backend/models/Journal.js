const mongoose = require('mongoose');


const journalSchema = new mongoose.Schema({
    text: { type : String, required:true},
    location:{
        type:{
            type: String, enum :['Point'], required:true},
            coordinates : {type:[Number], required:true},
        },
        date:{ type: Date, default: Date.now},
});

journalSchema. index({location: '2dsphere'});
module.exports = mongoose.model('journal', journalSchema);

