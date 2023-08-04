import {Text, Center} from '@chakra-ui/react'
import {useEffect, useState} from 'react'

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

// api import
import { getBlockInfo } from '../../api/notion'


const testData = {
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
          "val": 10 
        },
       
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        }
    ]
       
}

export default function GraphViz() {

    const [apiData, setApiData] = useState()

    const handleSetApiData = (result) => {
        setApiData(result)
    }

    useEffect(() => {

        async function fetchDatafromApi()  {
            const result = await getBlockInfo('13968157a86f4d8c9276d017c6deceed')
            handleSetApiData(result)
            

        }

        fetchDatafromApi()
        
    }, [])

    return (
        <div>
            <Text>Graph</Text>
            <ForceGraph3D graphData={testData} />
            
        </div>
    )
}