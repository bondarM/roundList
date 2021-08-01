import React, { useState } from 'react'

export const RoundResult = ({ rounds, infoRound, children, roundId, dateTime }) => {
    // return (
    //     <div className="roundlist__items">{itemsBlock.length ? itemsBlock.map((item, i) => {
    //         return <div className="roundlist__row">
    //             {item.map((img, index) => {
    //                 if (img == 4) {
    //                     return <img key={index} className={`items__image item__4 item__position__${i}`} src={require(`../images/${img}.png`).default} />
    //                 } else {
    //                     return <img key={index} className="items__image" src={require(`../images/${img}.png`).default} />
    //                 }
    //             })}
    //         </div>
    //     }) : ""}</div>
    // )
    const [open, setOpen] = useState(false)

    return (
        <>
            <tr onClick={(e) => { infoRound(roundId); setOpen(!open) }} key={dateTime}>
                <th>{roundId}</th>
                <th>{dateTime}</th>
            </tr>
            
            <div className={`${open ? "active" : ""}`}> {children} </div>
        </>
    )
}
