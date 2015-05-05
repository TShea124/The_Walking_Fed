// ADD BACKBONE VIEW
$(document).ready(function() {


	var CategoryView = Backbone.View.extend({
		tagName: "li id='catname'",
		template: _.template($("#categoryTemplate").html()),
		events: {
			"click button.delete2Button": "deleteCategory",
			"click button.edit2Button": "editCategory",
			"click button.update2Button": "updateCategory"
		},

		// Updates a Category based on edit form fields.
		updateCategory: function() {

    	// Grabs name from edit form.
    	var newCategoryName = this.$("#newCategoryName" + this.model.id).val();
    	
		// update the model with those values locally.
		this.model.set({name: newCategoryName});

    	// Persists the model in the database and triggers sync.
    	this.model.save();

    	},

    	// Renders edit form
    	editCategory: function() {
    		this.$("span.category").hide();
    		this.$("span.editCategoryForm").show();
    	},

		// Delete Category from database and triggers remove event on collection.
		deleteCategory: function() {
			this.model.destroy();
		},

		render: function() {
			this.$el.html(this.template({category: this.model.toJSON()}));
			return this;
		}
	}); // End Category View

	var CategoriesView = Backbone.View.extend({
		el: "ul#categoryList",
		initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render);
		},

		render: function() {
		var categories = this.$el;
		categories.html("");
		this.collection.each(function(category) {
			categories.append(new CategoryView({model: category}).render().$el);
		});
		return this;
		}
	});


	var CreateCategoryView = Backbone.View.extend({
  	el: "#addCategoryForm",
  	events: {"click button#addNewCategory": "createCategory"},

  	createCategory: function() {

  		var nameField = this.$("#newCategoryName");
		var name = nameField.val();


  		// This will add a new category to the collectin, save to database, and trigger "sync" event on collection.
  		this.collection.create({name: name});

  		// Resets Text Fields
  		nameField.val("");
  	}
  }); 

new CategoriesView({collection: categories});
new CreateCategoryView({collection: categories});


});
