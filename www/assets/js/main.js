require.config({

	baseUrl :'/assets/js/',
	deps    :['jquery', 'jails', global.page],

	paths   :{
		jails		:'//rawgit.com/jails-org/Jails/master/source/jails.min',
		mods		:'//rawgit.com/jails-org/Modules/master',
		comps		:'//rawgit.com/jails-org/Components/master',
		jquery 		:'//code.jquery.com/jquery-2.1.1.min',
		mustache  	:'//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.1.3/mustache.min'
	},

	callback :function( jquery, jails ){
		jails.start({ base :jquery });
	}
});
