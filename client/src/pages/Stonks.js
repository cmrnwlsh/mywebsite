import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './css/Stonks.css'
import MainNav from "./MainNav";
import {useEffect, useState} from "react";

export default function Stonks() {

    const [array, setArray] = useState([]);

    useEffect(() => {
        (async () => {
            await fetch('https://cmrnw.com/resource/pe.json')
                .then(r => r.json())
                .then(data => {
                    setArray(data.sort((a, b) => a['pe'] - b['pe']));
                })
        })();
    }, []);

    function renderTableData() {
        return array.map((cik) => {
            const {id, ticker, year, eps, price, pe} = cik
            return (
                <Tr key={{id}}>
                    <Td><a href={'https://www.cnbc.com/quotes/' + ticker}>{ticker}</a></Td>
                    <Td>{year}</Td>
                    <Td>{eps}</Td>
                    <td>{price}</td>
                    <td>{pe.toFixed(2)}</td>
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
                        <Th>Price</Th>
                        <Th>Price / Earnings Ratio</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTableData()}
                </Tbody>
            </Table>
        </>
    );
}