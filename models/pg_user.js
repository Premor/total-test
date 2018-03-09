exports.id = 'pg_user';
exports.version = '1.00';
const Agent = require('sqlagent/pg').connect({
    host: 'localhost',
    user: 'postgres',
    password: '1111',
    database: 'postgres'

})
const pg = new Agent();

exports.create = (user) => {
    // NoSQL embedded database
    pg.insert('test','test').make((builder)=>{
        builder.set({ 
            id: user.id,
            login: user.login,
            password: user.password
        })
    });
};