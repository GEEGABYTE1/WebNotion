import { link, linkSync } from "fs";
import { METHODS } from "http"
import { workerData } from "worker_threads";

const axios = require('axios')
var express = require('express')
const { Client } = require('@notionhq/client');
const router = express.Router()
require('dotenv').config()


const notion = new Client({ auth:  process.env.NOTION_API_KEY});

const fetchNotionPage = async(pageId) => {

    try {
        console.log("in function")
        
        const response = await notion.pages.retrieve({page_id: pageId, type:"link_to_page"})
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

        //console.log("Block Response: ", response)
        
        return response
    } catch(err) {
        console.log("Error: ", err)
        return {}
    }


}



async function FilterAllLinks(rootPageId: string) {
   var link_array = []
   var queue_array = [rootPageId]

    try {
        while (queue_array.length > 0) {

            const current_pageid = queue_array[0]
            console.log("Current Pageid: ", current_pageid)
            var worked_with_api = await fetchBlockFromPage(current_pageid)
            
            worked_with_api = worked_with_api['results']
            
    
            for (let i = 0; i <= worked_with_api.length; i++) {
                const cur_block_obj = worked_with_api[i]
                if (cur_block_obj === undefined) {
                    continue
                } else {
                    const cur_rich_text = cur_block_obj['paragraph']['rich_text']
                    if (Object.keys(cur_rich_text).length >= 2) {
                        const mention_dict = cur_rich_text['0']
                        const href= mention_dict['href']
                        const new_page_id = href.split('/')[3]
                        link_array.push({[`https:www.notion.so/${current_pageid}`]: href})
                        queue_array.push(new_page_id)
    
                    } else {
                        
                        continue
                    }
                }
            }
            
    
            queue_array = queue_array.slice(1)
    
        }
        console.log("Link Array: ", link_array)
        return link_array
        
    } catch (err) {
        console.log("Error: ", err)
        return []
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
    
    //const result = await fetchBlockFromPage(user_page_id)
    const filteredResult = await FilterAllLinks(user_page_id)
    if (filteredResult.length > 0) {
        res.status(200).json(filteredResult)
    } else [
        res.status(200).json([])
    ]

})



module.exports = router