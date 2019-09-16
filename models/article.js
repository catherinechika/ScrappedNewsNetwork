const mongoose = require('mongoose')


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


var scrappedArticle = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      summary: {
        type: String,
        required: true
      },
      note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
      }
});

var Article = mongoose.model('Article', scrappedArticle);
module.exports = Article;
