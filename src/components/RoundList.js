import React, { useEffect, useState } from 'react'
import { RoundResult } from './RoundResult'

export const RoundList = () => {
    const [rounds, setRounds] = useState([])
    const [itemsBlock, setItemsBlock] = useState([])
    const [itemsHeight, setItemsHeight] = useState("")
    const [activeList, setActiveList] = useState(-1);

    useEffect(() => {
        getRounds()
    }, [])


    const getRounds = () => {
        fetch('https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/rounds')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRounds(data);
            });
    }


    const infoRound = (id) => {
        fetch(`https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1/round/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let list = data.items.split(",")
                let matrix = listToMatrix(list, list.length / data.height)
                setItemsBlock(matrix);
            })
    }


    function listToMatrix(list, elementsPerSubArray) {
        let matrix = [], i, k;
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }

    const addActive = (e, tab) => {
        activeList === tab ? setActiveList(0) : setActiveList(tab);
    }




    //     return (
    //         <div className="roundlist">
    //             <table>
    //                 <tr>
    //                     <th>Rounds</th>
    //                     <th>Date</th>
    //                 </tr>
    //                 {rounds.map(round => (
    //                     <>
    //                         <tr onClick={(e) => { infoRound(round.roundId); addActive(e, round.roundId) }} key={round.dateTime}>
    //                             <th>{round.roundId}</th>
    //                             <th>{round.dateTime}</th>
    //                         </tr>
    //                         {(activeList === round.roundId) ?
    //                           <RoundResult itemsBlock={itemsBlock} />
    //                             :
    //                             ""
    //                         }
    //                     </>
    //                 ))}
    //             </table>
    //         </div>
    //     )
    // }


    return (
        <div className="roundlist">
            <table>
                <tr>
                    <th>Rounds</th>
                    <th>Date</th>
                </tr>

                {rounds.map(round => (
                    <>
                        <RoundResult roundId={round.roundId} dateTime={round.dateTime} infoRound={infoRound} rounds={rounds} >

                            <div className="roundlist__items">{itemsBlock.length ? itemsBlock.map((item, i) => {
                                return <div className="roundlist__row">

                                    {item.map((img, index) => {
                                        if (img == 4) {
                                            return <img key={index} className={`items__image item__4 item__position__${i}`} src={require(`../images/${img}.png`).default} />
                                        } else {
                                            return <img key={index} className="items__image" src={require(`../images/${img}.png`).default} />
                                        }
                                    })}
                                    
                                </div>
                            }) : <div></div>}</div>

                        </RoundResult>

                    </>
                ))}




            </table>
        </div>
    )
}
