
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react'


import { Text, Center } from '@chakra-ui/react'

// API import 

import { fetchNotionPage } from '../../api/notion'

export default function Graph() {


    useEffect(() => {
        fetchNotionPage('13968157a86f4d8c9276d017c6deceed')
    }, [])

    return (
        <div>
            <Text>Notion Graph</Text>
        </div>
    )
}