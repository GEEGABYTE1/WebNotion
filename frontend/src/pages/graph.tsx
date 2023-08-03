
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react'


import { Text, Center } from '@chakra-ui/react'

// API import 

import { fetchNotionPage, fetchNotionBlock } from '../../api/notion'




export default function Graph() {

    const [blockDict, setBlockDict] = useState({})

    const handleSetBlockDict = (block_dict: {}) => {
        setBlockDict(block_dict)
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