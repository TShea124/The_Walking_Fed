// ADD BACKBONE VIEWS HERE
$(document).ready(function() {

	var DishView = Backbone.View.extend({
		tagName: "li",
		template: _.template($("#dishTemplate").html()),
		events: {
			  "click button.deleteButton": "deleteDish",
    		"click button.editButton": "editDish",
    		"click button.updateButton": "updateDish"
		},

		// Updates a Dish based on edit form fields.
    	updateDish: function() {
    	
      // Grabs name, imag_url, price from edit form.
    	var newName = this.$("#newName" + this.model.id).val();
    	var newimage_url = this.$("#newimage_url" + this.model.id).val();
    	var newprice = this.$("#newprice" + this.model.id).val();
      var newcategory_id = this.$("#newcategory_id" + this.model.id).val();

    	// update the model with those values locally.
    	this.model.set({name: newName, image_url: newimage_url, price: newprice, category_id: newcategory_id});

    	// Persists the model in the database and triggers sync.
    	this.model.save();

    	},

    	// Renders edit form
    	editDish: function() {
    	this.$("span.dish").hide();
    	this.$("span.editForm").show();
    	},

		  // Delete Dish from database and triggers remove event on collection.
    	deleteDish: function() {
    	this.model.destroy();
    	},
    	
		  render: function() {
			this.$el.html(this.template({dish: this.model.toJSON()}));
			return this;
		  }
	}); 

  // End Dish View


	var DishesView = Backbone.View.extend({
		el: "ul#dishesList",
		initialize: function() {
			this.listenTo(this.collection, "sync remove", this.render);
		},

		render: function() {
			var dishes = this.$el;
			dishes.html("");
			this.collection.each(function(dish) {
				dishes.append(new DishView({model: dish}).render().$el);
			});
			return this;
		}
	});



	var CreateDishView = Backbone.View.extend({
    	el: "#addDishForm",
  	  events: {"click button#addNewDish": "createDish"},

  
  createDish: function() {

  		var nameField = this.$("#newDishName");
  		var image_urlField = this.$("#newDishimage_url");
  		var priceField = this.$("#newDishprice");
      var category_idField = this.$("newDishcategory_id");
		  var name = nameField.val();
  		var image_url = image_urlField.val();
  		var price = priceField.val();
      var category_id = category_idField.val();


  		// This will add a new Dish to the collectin, save to database, and trigger "sync" event on collection.
  		this.collection.create({name: name, image_url: image_url, price: price, category_id: category_id});

  		// Resets Text Fields
  		nameField.val("");
  		image_urlField.val("");
  		priceField.val("");
      category_idField.val("");
  	}
  }); 

  
  new DishesView({collection: dishes});
  new CreateDishView({collection: dishes});


});