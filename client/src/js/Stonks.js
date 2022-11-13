import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import '../css/Stonks.css'
import MainNav from "./MainNav";
import {useEffect, useState} from "react";

export default function Stonks() {

    const [array, setArray] = useState([]);

    useEffect(() => {
        (async () => {
            await fetch('http://192.168.0.136:3000/resource/earnings.json')
                .then(r => r.json())
                .then(data => {
                    setArray(data.sort((a, b) => b['eps'] - a['eps']));
                })
        })();
    }, []);

    function renderTableData() {
        return array.map((cik) => {
            const {id, ticker, year, eps} = cik
            return (
                <Tr key={{id}}>
                    <Td>{ticker}</Td>
                    <Td>{year}</Td>
                    <Td>{eps}</Td>
                </Tr>
            )
        })
    }

    return (
        <>
            <MainNav/>
            <Table className="Stonks">
                <Thead>
                    <Tr>
                        <Th>Ticker</Th>
                        <Th>Fiscal Year</Th>
                        <Th>Earnings Per Share</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTableData()}
                </Tbody>
            </Table>
        </>
    );
}