
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react'


import { Text, Center } from '@chakra-ui/react'

// API import 

import { fetchNotionPage, fetchNotionBlock} from '../../api/notion'




export default function Graph() {

    const [blockDict, setBlockDict] = useState({})
    const [pageId, setPageId] = useState('')
    const [rootPageId, setRootpageId] = useState('')

    const handleSetBlockDict = (block_array: []) => {
        const new_dict: {} = {}
        for (let i =0; i<= block_array.length; i++) {
            const cur_link_dict = block_array[i]
            if (cur_link_dict === undefined) {
                continue
            } else {
                const home_link: string = Object.keys(cur_link_dict)[0]
                const transfer_link = cur_link_dict[home_link]

                const new_dict_keys = Object.keys(new_dict)
                if (new_dict_keys.includes(home_link)) {
                    new_dict[home_link].push(home_link)
                } else {
                    new_dict[home_link] = [transfer_link]
                }
                
            }
        }

        console.log("New Dict: ", new_dict)
        
    }







    useEffect(() => {
        //fetchNotionPage('13968157a86f4d8c9276d017c6deceed')
        const handlefetchNotionBlockAPI = async() => {
            const api_result = await fetchNotionBlock('13968157a86f4d8c9276d017c6deceed') 
            handleSetBlockDict(api_result)
            console.log("Data to handle: ", api_result)
            
            
        }

        handlefetchNotionBlockAPI()
        
    }, [])

    return (
        <div>
            <Text>Notion Graph</Text>
        </div>
    )
}