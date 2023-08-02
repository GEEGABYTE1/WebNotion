import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

'use client'
import { Text, Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Text>Hi</Text>
      <Text>ChakraUI Finally works!!!</Text>
      <Text>We are working with TS Next.js Stack!!!</Text>
    </div>
  )
}
