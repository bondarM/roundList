import React, { useEffect, useState } from 'react'
import { RoundResult } from './RoundResult'

export const RoundList = () => {
    const [rounds, setRounds] = useState([])
    // const [itemsHeight, setItemsHeight] = useState("")

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


    return (
        <div className="roundlist">
            <table>
                <tr>
                    <th>Rounds</th>
                    <th>Date</th>
                </tr>
                {rounds.map(round => (
                        <RoundResult roundId={round.roundId} dateTime={round.dateTime} rounds={rounds} />
                ))}
            </table>
        </div>
    )
}
