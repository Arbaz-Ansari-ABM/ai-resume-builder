const { spawn } = require("child_process");

console.log("Frontend Successfully run 🚀");

const devServer = spawn("npm", ["run", "react-start"], { stdio: "inherit" });
