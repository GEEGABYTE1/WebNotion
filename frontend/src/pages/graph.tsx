'use client'

import {useEffect, useState, useRef} from 'react'


import { Text, Center } from '@chakra-ui/react'


// API import 

import { fetchNotionPage, fetchNotionBlock} from '../../api/notion'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';



  


export default function GraphViz() {

    const [edgeArray, setEdgeArray] = useState([])
    const [nodeArray, setNodeArray] = useState([])
    const [realEdgeDictArray, setRealEdgeDictArray] = useState([])
    
    

    const handlesetNodeArray = (block_array: []) => {
        const array  = []
        

        for (let i =0; i<=block_array.length; i++) {
            const cur_block_dict = block_array[i]
            if (cur_block_dict === undefined) {
                continue
            } else {
                const key = Object.keys(cur_block_dict)[0]
                const val = cur_block_dict[key]
                console.log(`Key: ${key} | Val: ${val}`)
                if (array.includes(key)) {
                    continue
                } else {
                    array.push(key)
                }
                if (array.includes(val)) {
                    continue
                } else {
                    array.push(val)
                }
                
                
                
            }
        } 

        const node_array: any = []
        for (let idx = 0; idx <= array.length; idx++) {
            const cur_link = array[idx]
            if (cur_link === undefined) {
                continue 
            } else {
                node_array.push({id: (idx + 1), name: cur_link, val:cur_link})
            }
        }



        console.log("Node Array: ", node_array)
        setNodeArray(node_array)
        return node_array
        
    }

    const createEdgeArray= (node_array, api_result) => {
        var node_dict: any = {}
        

        for (let node_idx =0 ; node_idx <= node_array.length; node_idx++) {
            const cur_node_dict = node_array[node_idx]
            if (cur_node_dict === undefined) {
                continue
            } else {
                const node_name = cur_node_dict['name']
                const name_id = cur_node_dict['id']
                node_dict[node_name] = name_id
            }
        }

        console.log("Node dict: ", node_dict)

        const edge_array = []


        for (let api_idx = 0; api_idx <= api_result.length; api_idx++) {
            const cur_link_dict = api_result[api_idx]
            if (cur_link_dict === undefined) {
                continue
            } else {
                const source = Object.keys(cur_link_dict)[0]
                
                const target = Object.values(cur_link_dict)[0]
                const source_id = node_dict[source]
                const target_id = node_dict[target]
                edge_array.push({source_id, target_id})


            }
        }

        console.log("edge array Dict: ", edge_array)
        return edge_array
    }

        
        
    


    const handleSetBlockDict = (block_array: []) => {
        setEdgeArray(block_array)
        return block_array
    }

    







    useEffect(() => {


        //fetchNotionPage('13968157a86f4d8c9276d017c6deceed')
        const handlefetchNotionBlockAPI = async() => {
            const api_result = await fetchNotionBlock('13968157a86f4d8c9276d017c6deceed') 
            console.log("Data to handle: ", api_result)
            const node_array = handlesetNodeArray(api_result)
            const edge_array = createEdgeArray(node_array, api_result)
            
            console.log("Final Nodes: ", node_array)
            console.log("Final edge: ", edge_array)
            const json_dict = {nodes: node_array, links: edge_array}
            const json_string = JSON.stringify(json_dict)
            




           

            

            
            
        }

        handlefetchNotionBlockAPI()

        
        
    }, [])

    

    return (
        <div>
            <Text>Notion Graph</Text>
            
            
            
            
        </div>
    )
}