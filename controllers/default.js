exports.install = function() {
	ROUTE('/');
	
	ROUTE('/registration',view_registration,['#session']);
	ROUTE('/registration',view_registration_auth,['#session']);
	ROUTE('/registration', json_create_user, ['post','#session']);
	ROUTE('/login');
	
	ROUTE('/login/google',oauth_login,['#session']);
	ROUTE('/login/google/callback/', oauth_login_callback, ['#session']);
	//ROUTE('/test', test);
	ROUTE('/login', login, ['post','#session']);
	ROUTE('/logout',logout,['authorize']);
	//ROUTE('/congratulation')
	// or
	// F.route('/');
};

function logout(){
	this.cookie('user','','-1 day')
	this.redirect('/')
}

function oauth_login() {
    var self = this;
    var type = self.req.path[1];
    
    // config:
    // oauth2.google.key =
    // oauth2.google.secret =
    // oauth2.github.key =
    // oauth2.github.secret =
    // ...
	console.log(CONFIG('oauth2.google.key'))
    MODULE('oauth2').redirect(type, CONFIG('oauth2.' + type + '.key'), self.host('/login/' + type + '/callback/'), self);
}

// Controller action
function oauth_login_callback() {
    var self = this;
    var type = self.req.path[1];
    var url = self.host('/login/' + type + '/callback/');

    // config:
    // oauth2.google.key =
    // oauth2.google.secret =
    // oauth2.github.key =
    // oauth2.github.secret =
    // ...

    MODULE('oauth2').callback(type, CONFIG('oauth2.' + type + '.key'), CONFIG('oauth2.' + type + '.secret'), url, self, function(err, profile, access_token) {
        console.log(profile);
        self.json(SUCCESS(true));
    });
}

function test(){
	var user = { id: Utils.GUID(5), login: 123, password: 321 };
	
	MODEL('pg_user').create(user);
	this.view('congratulation')
}

function view_index() {
	var self = this;
	self.view('index');
}

function view_registration_auth(){
	var self = this;
	self.view('registration_auth');
}

function view_registration(){
	var self = this;
	self.view('registration');
}

function login(){
	let self = this;
	console.log(self.session)
	MODEL('user').find_u(this.body.login, this.body.psw, (err,res)=>{
		if (err)
			this.view('fail', err);
		else
		{
			this.cookie('user', res.id, '5 days');
			this.redirect('/');
		}
	})
}
function json_create_user() {
	var user = { id: Utils.GUID(5), login: this.body.login, password: this.body.psw };
	

	//console.log(this.flags)
	//console.log(this.body)
    // global alias:
    MODEL('user').create(user);
    this.view('/congratulation', user);
}