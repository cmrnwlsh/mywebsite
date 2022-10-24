fetch('https://data.sec.gov/api/xbrl/companyfacts/CIK0000712034.json')
    .then((response) => response.json())
    .then((data) => console.log(data['facts']['us-gaap']));
