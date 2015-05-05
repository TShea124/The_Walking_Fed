// Represents a collection of categories. 

var CategoryCollection = Backbone.Collection.extend({
  model: Category,
  url: '/categories'
});

var categories = new CategoryCollection();

// get all the categories from the server
categories.fetch();