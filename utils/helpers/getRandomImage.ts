import axios from "axios"

export default async function getRandomImage() {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&tag=abstract`)
    console.log(res.data)
    return res.data
}