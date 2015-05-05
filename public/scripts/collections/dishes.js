// Represents a collection of dishes. 
var DishCollection = Backbone.Collection.extend({
  model: Dish,
  url: '/dishes'
});

var dishes = new DishCollection();

// get all the dishes from the server
dishes.fetch();
