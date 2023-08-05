import {Text, Center} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import styles from "../styles/Home.module.css"
import Link from 'next/link'

export default function HomePage() {
    


    return (
        <div>
            <div className={styles.sidenav}>
                <Link href='/graph'><Text>Graph</Text></Link>
                <Text>File 1</Text>
                <Text>File 2</Text>
                <Text> File 3</Text>

            </div>
        </div>
    )
}