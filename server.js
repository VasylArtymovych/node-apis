const app = require("./app");
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT || 3030;

async function main() {
  await connectMongo();
  console.log("MongoDB conected!!!");
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log(`Server running. Use our API on port:${PORT}`);
  });
}

main();
