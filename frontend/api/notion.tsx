
import axios from 'axios'



export const getBlockInfo = async(pageId: string) => {
    try {
        const result = await axios.get(`http://localhost:3001/notion/page/block/${pageId}`, {
            method: "GET"

        })

        const response = await result
        console.log("DAta from API: ", response['data'])
        return response['data']
    } catch (err) {
        console.log("Notion error: ", err)
    }
}