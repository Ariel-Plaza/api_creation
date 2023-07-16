import app from "./src/app.js"

const PORT = 3000;


const main = () => {
  try {
    app.listen(PORT, () => {
      console.log("Server running at port: " + PORT);
    })
  } catch (error) {
    console.log("An error occurred while starting the server");
  }
}

main();