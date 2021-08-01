import React, { useState } from 'react'

export const RoundResult = ({ rounds, children, roundId, dateTime }) => {

    const [open, setOpen] = useState(false)
    const [itemsBlock, setItemsBlock] = useState([])

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
    return (
        <>
            <tr onClick={(e) => { infoRound(roundId); setOpen(!open) }} key={dateTime}>
                <th>{roundId}</th>
                <th>{dateTime}</th>
            </tr>

            <div className={`${open ? "active" : ""}`}>
                <div className="roundlist__items">
                    {itemsBlock.length ? itemsBlock.map((item, i) => {
                        return <div className="roundlist__row">

                            {item.map((img, index) => {
                                if (img == 4) {
                                    return <img key={index} className={`items__image item__4 item__position__${i}`} src={require(`../images/${img}.png`).default} />
                                } else {
                                    return <img key={index} className="items__image" src={require(`../images/${img}.png`).default} />
                                }
                            })}

                        </div>
                    }) : <div></div>}
                </div>
            </div>
        </>
    )
}
