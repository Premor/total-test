exports.install = function() {
	ROUTE('/');
	
	ROUTE('/registration',view_registration,['unauthorize']);
	ROUTE('/registration',view_registration_auth,['authorize']);
	ROUTE('/registration', json_create_user, ['post','unauthorize']);
	ROUTE('/login');
	ROUTE('/test', test);
	ROUTE('/login', login, ['post']);
	ROUTE('/logout',logout,['authorize']);
	//ROUTE('/congratulation')
	// or
	// F.route('/');
};

function logout(){
	this.cookie('user','','-1 day')
	this.redirect('/')
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