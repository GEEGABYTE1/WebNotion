import axios from "axios";
import 'dotenv/config'


export const fetchNotionPage = async(page_id:string) => {
    try {
        const response = await axios.get(`http://localhost:3001/notion/page/${page_id}`, {
            method: "GET"
        })

        const result = await response
    } catch (err) {
        console.log("Error: ", err)
    }
}