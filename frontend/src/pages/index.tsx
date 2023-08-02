'use client'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


import { Text, Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      
        <Link href={'./graph'}>
          
            <Text>Notion Homepage </Text>
        
        </Link>
    </div>
  )
}
