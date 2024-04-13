const { exec } = require('child_process');

// Define servers to start
const servers = [
  'nurse-microservice.js',
  'patient-microservice.js',
  'visit-microservice.js',
  
];

// Function to start servers
function startServers() {
  servers.forEach(server => {
    const child = exec(`node ${server}`);

    child.stdout.on('data', data => {
      console.log(`${server} started: ${data}`);
    });

    child.stderr.on('data', data => {
      console.error(`Error starting ${server}: ${data}`);
    });

    child.on('exit', code => {
      console.log(`${server} exited with code ${code}`);
    });
  });
}

startServers();


