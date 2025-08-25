const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root", 
  password: "root",
  database: "nodedb"
};

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(config);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    const randomNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Lucia', 'Gabriel', 'Fernanda'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    
    await connection.execute('INSERT INTO people(name) VALUES(?)', [randomName]);

    const [rows] = await connection.execute('SELECT name FROM people');
    await connection.end();

    let namesList = '<ul>';
    rows.forEach(row => {
      namesList += `<li>${row.name}</li>`;
    });
    namesList += '</ul>';

    const html = `<h1>Full Cycle Rocks!</h1>${namesList}`;
    
    res.send(html);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
