module.exports = function(){

	var list = global.model('list');
	var lastname = global.request.query.lastname;

	return {

		user :{
			name	  :'my-first-name',
			lastname  :lastname
		},

		list :list.items
	};
};
