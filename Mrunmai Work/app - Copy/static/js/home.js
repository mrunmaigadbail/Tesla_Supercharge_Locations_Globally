let url = `/api/v1/sunburst`;
d3.json(url).then(function (received_data) {

    let jsonData = received_data.sunburst_data
    
    // Transform JSON data into Plotly format
const ids = [];
const labels = [];
const parents = [];
const hovertexts = [];

function addNode(id, label, parent, hoverText = '') {
    ids.push(id);
    labels.push(label);
    parents.push(parent);
    hovertexts.push(hoverText);
}

addNode('root', 'Tesla <br> Superchargers', '');

// jsonData.forEach(entry => {
//     const countryId = `country_${entry.Country}`;
//     const stateId = `state_${entry.State}`;
//     const cityId = `city_${entry.City}`;

//     if (!ids.includes(countryId)) {
//         addNode(countryId, entry.Country, 'root');
//     }

//     if (!ids.includes(stateId)) {
//         addNode(stateId, entry.State, countryId);
//     }

//     addNode(cityId, entry.City, stateId);
// });

jsonData.forEach(entry => {
    const countryId = `country_${entry.Country}`;
    const stateId = `state_${entry.State}`;
    const cityId = `city_${entry.City}`;
    
    // Customize labels with additional information
    // const countryLabel = `${entry.Country} `;
    // const stateLabel = `${entry.State}`;
    // const cityLabel = `${entry.City}`;
    // const cityHoverText = `Stalls: ${entry.stalls}`;

    const countryLabel = `${entry.Country} `;
    const stateLabel = `${entry.State.substring(0, entry.State.indexOf("_"))}`;
    const cityLabel = `${entry.City.substring(0, entry.City.indexOf("_"))}`;
    //const cityHoverText = `No. of Superchargers: ${entry.stalls} <extra></extra>`;
    // let cityHoverText = `No. of Superchargers: ${entry.stalls} <extra></extra>`;
    const cityHoverText = `No. of Superchargers: ${entry.stalls} <br><extra></extra>`;
                        
    //string.concat(string1, string2, ..., stringX)

    if (!ids.includes(countryId)) {
        addNode(countryId, countryLabel, 'root');
    }

    if (!ids.includes(stateId)) {
        addNode(stateId, stateLabel, countryId);
    }

    addNode(cityId, cityLabel, stateId, cityHoverText);
});

// Create the Plotly sunburst chart
// const data = [{
//     type: 'sunburst',
//     ids: ids,
//     labels: labels,
//     parents: parents,
//     text: hovertexts, // Display hover text
//     hoverinfo: 'label+text', // Customize which information to show on hover
//     domain: {column: 0},
//     maxdepth: 3,
// }];
const data = [{
    type: 'sunburst',
    ids: ids,
    labels: labels,
    parents: parents,
    //values: hovertexts, // Display hover text
    hovertemplate: hovertexts, // Customize which information to show on hover
    domain: {column: 0},
    maxdepth: 3,
}];

const layout = {
    margin: {l: 0, r: 0, t: 0, b: 0},
};

Plotly.newPlot('sunburst', data, layout);
});



