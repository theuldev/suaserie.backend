const { exec } = require('child_process');

exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar as migrations: ${error}`);
  } else {
    console.log('Migrations executadas com sucesso');
  }
});

