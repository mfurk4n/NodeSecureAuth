const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Veritabanina Baglanildi")
}).catch(err => console.log("!!! Veritabani Baglantisinda Hata !!!: " + err));


module.exports;