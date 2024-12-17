import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'RBAC'
});

connection.connect(err => {
    if (err) {
        console.error('Error connection MySQL:', err);
        return;
    }
    console.log('Connection MySQL success!');
});

export default connection;
