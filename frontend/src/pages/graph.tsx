import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'


import { Text, Center } from '@chakra-ui/react'
import Graph from 'react-graph-vis'

// API import 

import { fetchNotionPage, fetchNotionBlock} from '../../api/notion'
import { Crushed } from 'next/font/google'


const options = {
    layout: {
        randomSeed: undefined,
        improvedLayout:true,
        hierarchical: false,
        
    },
   
    edges: {
        arrows:{
          to:{
            type: "image",
            
          }
        },
        color: {
          
          
          color: "#fbfffe",
          hover: '#819fb3',
          opacity: 0.9,
          
        },
        font: {
          color: '#819fb3',
          size: 16, 
          face: 'spectral',
          background: 'none',
          strokeWidth: 3,
  
          
          align: 'horizontal',
          multi: false,
          vadjust: 0
        },
        selfReferenceSize: 15,
        selfReference:{
            size: 15,
            angle: Math.PI / 4,
            renderBehindTheNode: true
        },
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.5
        },
    },
    autoResize: true,
    clickToUse: true,
  
  
    nodes: {
      shape: 'dot',
      
      
      widthConstraint: false,
      size: 9,
      font :{
        
        color: "#fbfffe",
        face: "spectral",
  
      }
  
    },
    
    
  
}

const Animator = dynamic(
    import("react-scroll-motion").then((it) => it.Animator),
    {ssr:false}
)
  


export default function Graph() {

    const [edgeArray, setEdgeArray] = useState([])
    const [nodeArray, setNodeArray] = useState([])
    

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

        const node_array = []
        for (let idx = 0; idx <= array.length; idx++) {
            const cur_link = array[idx]
            if (cur_link === undefined) {
                continue 
            } else {
                node_array.push({id: idx, label: cur_link, color: "#e0df41"})
            }
        }



        console.log("Node Array: ", node_array)
        setNodeArray(node_array)
        
    }


    const handleSetBlockDict = (block_array: []) => {
        setEdgeArray(block_array)
    }







    useEffect(() => {
        //fetchNotionPage('13968157a86f4d8c9276d017c6deceed')
        const handlefetchNotionBlockAPI = async() => {
            const api_result = await fetchNotionBlock('13968157a86f4d8c9276d017c6deceed') 
            handleSetBlockDict(api_result)
            handlesetNodeArray(api_result)
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