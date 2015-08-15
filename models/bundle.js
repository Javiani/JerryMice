module.exports = function(){

	var list = model('list');
	var lastname = request.query.lastname;

	return {

		user :{
			name	  :'my-first-name',
			lastname  :lastname
		},

		list :list.items
	};
};
