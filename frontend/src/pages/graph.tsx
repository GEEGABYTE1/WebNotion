import {Text, Center} from '@chakra-ui/react'
import {useEffect, useState} from 'react'

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

// api import
import { getBlockInfo } from '../../api/notion'

import styles from "../styles/Home.module.css"


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
    const [graphDict, setGraphDict] = useState({nodes: [], links:[]})

    const createidDict = (api_result) => {
        const link_array = []
        for (let i =0; i <= api_result.length; i++) {
            const cur_relation = api_result[i]
            if (cur_relation === undefined) {
                continue 
            } else {
                const key = Object.keys(cur_relation)[0]
                const val = Object.values(cur_relation)[0]
                if (link_array.includes(key)) {} else {link_array.push(key)}
                if (link_array.includes(val)) {} else {link_array.push(val)}
            }
        }

        const link_id_dict = {}

        for (let j =0; j <= link_array.length; j++) {
            const cur_link = link_array[j]
            if (cur_link === undefined) {
                continue
            } else {
                link_id_dict[cur_link] = j
            }
        }

        return link_id_dict
    }

    const createNodeArray = (link_dict) => {
        var nodes = []
        
        for (let i =0; i<= Object.keys(link_dict).length; i++) {
            const cur_id = Object.keys(link_dict)[i]
            if (cur_id === undefined) {
                continue
            } else {
                const link = link_dict[cur_id]
                const temp_node_dict = {"id": link, "name": cur_id, "val": i}
                nodes.push(temp_node_dict)
            }
        }

        console.log(nodes)
        return nodes
    }


    const createLinkArray = (link_dict, api_result) => {
        const links = []
        for (let api_idx = 0; api_idx <= api_result.length; api_idx++) {
            const cur_relation = api_result[api_idx]
            if (cur_relation === undefined) {
                continue
            } else {
                const home_val = Object.keys(cur_relation)[0]
                const landing_val = cur_relation[home_val]
                const home_id = link_dict[home_val]
                const landing_id = link_dict[landing_val]
                links.push({"source": home_id, "target": landing_id})
            }
        }

        console.log("links: ", links)
        return links
    }




    const handleSetApiData = (result) => {
        const nodeArray = createNodeArray(createidDict(result))
        const linkArray = createLinkArray(createidDict(result), result)
        const graphData = {"nodes": nodeArray, "links": linkArray}
        console.log("graph data: ", graphData)
        setGraphDict(graphData)
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

            

            {graphDict['nodes'].length === 0?<div>Loading Graph...</div>:
            
                <div>
                    <ForceGraph3D graphData={graphDict} />
                </div>
            }
            
            
        </div>
    )
}