import { Text,Center } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/homepage">
        <Text>Notion Graph viz</Text>
      </Link>
    </div>
  )
}
