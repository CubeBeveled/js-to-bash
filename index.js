const { exec } = require("child_process");
const readline = require("readline");
const colors = require("colors");
const os = require("os")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(colors.bgWhite(`Platform: ${os.platform()}`))
console.log(colors.reset("Welcome to the Shell!"))
console.log()
console.log(colors.yellow("Type exit at any time to exit the shell"))

question()
function question() {
  rl.question("", async (command) => {
    if (command !== "exit") {
      console.log(await executeCommand(command))
      question()
    } else {
      process.exit(0);
    }
  });
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (stderr) {
        resolve(stderr)
        return;
      }

      resolve(stdout)
    });
  })
}