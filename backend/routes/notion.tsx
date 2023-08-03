import { METHODS } from "http"

const axios = require('axios')
var express = require('express')
const { Client } = require('@notionhq/client');
const router = express.Router()
require('dotenv').config()


const notion = new Client({ auth:  process.env.NOTION_API_KEY});

const fetchNotionPage = async(pageId) => {

    try {
        console.log("in function")
        
        const response = await notion.pages.retrieve({page_id: pageId})
        return response

    } catch (err) {
        console.log("Error: ", err)
        return {}
    }

   

}

const fetchBlockFromPage = async(pageId) => {
    console.log("Block Id:", pageId)
    try {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            page_size: 50
        })

        console.log("Block Response: ", response)
        return response
    } catch(err) {
        console.log("Error: ", err)
        return {}
    }


}


router.get('/page/:page_id', async (req, res) => {
    const user_page_id: string = req.params['page_id']
    console.log("User page Id: ", user_page_id)
    var result = await fetchNotionPage(user_page_id)
    if (Object.keys(result).length > 0) {
        res.status(200).json(result)
    } else {
        res.status(200).json({})
    }
  
    
})


router.get('/page/block/:block_id', async(req, res) => {
    const user_page_id: string = req.params['block_id']
    
    const result = await fetchBlockFromPage(user_page_id)
    if (Object.keys(result).length > 0) {
        res.status(200).json(result)
    } else [
        res.status(200).json({})
    ]

})



module.exports = router