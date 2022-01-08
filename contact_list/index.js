const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

var contactList = [{
    name: "raj",
    phone: '8408880111'
}, {
    name: "dk",
    phone: '8777776555'
}];


app.get('/', function(req, res) {
    Contact.find({}, function(err, contacts){
        if(err){
            console.log(err);
            return;
        } 
    return res.render('home', {
        title: 'My Contact List',
        contact_List: contacts
    });
    });
});

app.post('/create-contact', function(req, res) {
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    }, function(err, newContact){
        if(err){
            console('error in creating!!! ', err);
            return;
        }
        return res.redirect('/');
    });
});

app.get('/delete_contact/', function(req, res) { 
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting', err);
            return;
        }
    return res.redirect('back');
    });
});


app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("My eXpress server launched on port ", port);
});