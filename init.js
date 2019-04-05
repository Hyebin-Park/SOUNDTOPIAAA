import app from "./app"

const PORT = process.env.PORT || 3000;


const handleListening = () => {
    console.log(`WELCOME TO http://localhost:${PORT}`)
}
app.listen(PORT, handleListening)