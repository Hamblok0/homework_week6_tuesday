// Collections and models


var contact = Backbone.Model.extend({
  url: 'https://tiny-starburst.herokuapp.com/collections/broj'
});


var contacts = Backbone.Collection.extend({
  model: contact,
  url: 'https://tiny-starburst.herokuapp.com/collections/broj'
});



// Forms

var formView = Backbone.View.extend({
  tagName: 'form',
  className: 'inputView',
  template: _.template($('#formTemplate').html()),
  events: {
    'click .submitBtn' : 'sendContacts'
  },

   sendContacts: function(){
     event.preventDefault();
     var email = $('.emailInput').val();
     var name = $('.nameInput').val();
     var phone = $('.phoneInput').val();
     var twitter = $('.twitInput').val();

     if (email.trim() === '' || name.trim() === '' || phone.trim() === '' || twitter.trim() === '') {
       alert("Please complete form before submitting");
     } else {
       var createContact = new contacts();
       createContact.create({
         'email': email,
         'name': name,
         'phone': phone,
         'twitter': twitter
       })

      $('.emailInput').val('');
      $('.nameInput').val('');
      $('.phoneInput').val('');
      $('.twitInput').val('');

       alert("New contact submitted");
     }

   },

   render: function(){
     this.$el.html(this.template());
     return this
   }
});

contactView = Backbone.View.extend({
  tagName: 'section',
  className: 'contactInfo',
  template: _.template($('#contactsTemplate').html()),
  render: function(){
    this.$el.html(this.template({
      contacts: this.collection.toJSON()
    }));
    return this;
  }

});

// Router

var contactsRouter = Backbone.Router.extend({
  routes: {
    '' : 'contactform',
    'contacts' : 'contacts'
  },

  contactform: function() {
    var view = new formView();
    $('.mainBody').html(view.render().$el);
  },

  contacts: function() {
    var contactModel = new contact();
    var contactsDude = new contacts();
    contactsDude.fetch().then(function(){
      var view = new contactView({
        model: contact
      });
      $('.mainBody').html(view.render().$el);
    });
  }

});


var router = new contactsRouter();
Backbone.history.start();
