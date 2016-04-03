module.exports = function(){

	var list = api('folder/list');
	var lastname = request.query.lastname;

	return {

		user :{
			name	  :'my-first-name',
			lastname  :lastname
		},

		list :list.items
	};
};
