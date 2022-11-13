module.exports = async () => {
    const nyse_cik = require('readline').createInterface({
        input: require('fs').createReadStream('./resource/nyse_cik.txt')
    });
    const ticker_edgar = require('readline').createInterface({
        input: require('fs').createReadStream('./resource/ticker-edgar.txt')
    });

    let ciks = [];
    let tickers = {};
    let output = [];

    ticker_edgar.on('line', line => {
        const split = line.split("\t")
        const cik = 'CIK' + Array(10 - split[1].length).fill('0').join('') + split[1]
        tickers[cik] = split[0].toUpperCase();
    });

    nyse_cik.on('line', line => {
        const cik = 'CIK' + Array(10 - line.length).fill('0').join('') + line
        ciks.push(cik);
    });

    await ticker_edgar.on('close', () => {
    });

    await nyse_cik.on('close', () => {
        ciks.forEach((cik, i) =>
            setTimeout(() =>
                fetch('https://data.sec.gov/api/xbrl/companyfacts/' + cik + '.json')
                    .then((response) => response.json())
                    .then((data) => {
                        data['facts']['us-gaap']['EarningsPerShareBasic']['units']['USD/shares']
                            .forEach(element => {
                                if (element['form'] === '10-K' &&
                                    element['frame'] &&
                                    !element['frame'].includes('Q') &&
                                    parseInt(element['frame'].slice(2, 6)) >= 2021) {
                                    output.push({
                                        cik: cik,
                                        ticker: tickers[cik],
                                        year: element['frame'].slice(2, 6),
                                        eps: element['val']
                                    });
                                    console.log(i + ': logging ' + cik);
                                }
                            });
                    }).catch(() => {
                }), i * 101));

        output = output.sort((a, b) => b['eps'] - a['eps']);
        output = output.slice(0, 30);
    });
}