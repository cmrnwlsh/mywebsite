// queries the SEC api for annual reports and writes the companies with the highest EPS to resource/earnings.json
async function edgar() {
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

    ticker_edgar.on('close', () => {
    });

    await new Promise(resolve => nyse_cik.on('close', resolve))

    await Promise.allSettled(ciks.map((cik, i) => new Promise(async resolve => {
        await new Promise(resolve => setTimeout(resolve, i * 101));
        fetch('https://data.sec.gov/api/xbrl/companyfacts/' + cik + '.json')
            .then(response => response.json())
            .then(data => {
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
                        }
                    });
                console.log(i + ': logging ' + cik);
                resolve();
            }).catch(() => {resolve(); console.log(i + ': ' + cik + ' not found')})
    })));

    output = output.sort((a, b) => b['eps'] - a['eps']);
    output = output.slice(0, 60);

    require('fs').writeFile('./resource/earnings.json', JSON.stringify(output, null, 4),
        e => console.log(e))

}

async function finnhub() {
    const finn = require('finnhub');
    const fs = require('fs/promises');

    const api_key = finn.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = await fs.readFile('./secret/apikey.txt', 'utf8');
    const finnhubClient = new finn.DefaultApi();
    let output = JSON.parse(await fs.readFile('./resource/earnings.json', 'utf8'));

    await Promise.allSettled(output.map((element, i) => new Promise(async resolve => {
        await new Promise(resolve => setTimeout(resolve, i * 1001));
        finnhubClient.quote(element['ticker'], (error, data) => {
            if(error) {console.log(error); resolve()}
            else {
                element['price'] = data['c']
                element['pe'] = element['price'] / element['eps'];
                console.log('logging ' + element['ticker'] + ': ' + element['pe']);
                resolve();
            }
        });
    })));

    await fs.writeFile('./resource/pe.json', JSON.stringify(output, null, 4))
}

if (process.argv[2] === 'edgar')
    edgar();

if (process.argv[2] === 'finnhub')
    finnhub();
