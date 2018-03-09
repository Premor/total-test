exports.id = 'redis';
exports.version = '1.00';

exports.install = (options) => {console.log('Redis model install')};

const redis  = require("redis");
// Создаем клиента
const client = redis.createClient();

exports.instance = client;
exports.get = (key) => {
    client.get(key,(err, data)=>{
        if(err) 
            console.log(err);
        else
            return data;
    })
}

exports.uninstall = () => {
    client.quit();
}