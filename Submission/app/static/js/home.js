let url = `/api/v1/sunburst`;
d3.json(url).then(function (received_data) {

    let jsonData = received_data.sunburst_data
    
    // Transform JSON data into Plotly format
const ids = [];
const labels = [];
const parents = [];
const hovertexts = [];
const chartLabel = 'Tesla <br> Superchargers';// Intital name at center of chart


function addNode(id, label, parent, hoverText = '') {
    ids.push(id);
    labels.push(label);
    parents.push(parent);
    hovertexts.push(hoverText);
}

addNode('root', chartLabel, '');//adding root node

// loop through each entry in data
jsonData.forEach(entry => {
    // creatin Ids
    const countryId = `country_${entry.Country}`;
    const stateId = `state_${entry.State}`;
    const cityId = `city_${entry.City}`;    
    const superchargerId = `city_${entry.Supercharger}`;
    
    // creating Labels
    const countryLabel = `${entry.Country} `;
    const stateLabel = `${entry.State.substring(0, entry.State.indexOf("_"))}`; //removeing everything after '_' which is added in sql helper city= city_state
    const cityLabel = `${entry.City.substring(0, entry.City.indexOf("_"))}`;    //removeing everything after '_' which is added in sql helper state = state_country
    const superchargerLabel = `${entry.Supercharger.substring(0, entry.Supercharger.indexOf(","))}`;
    
    //hover text at each level
    // <extra></extra> to remove extra information from hover
    const countryName = `${countryLabel}<extra></extra>`
    const stateName = `${stateLabel}<extra></extra>`
    const cityName = `${cityLabel}<extra></extra>`
    const superchargerHoverText = `
        Name: ${superchargerLabel} <br>
        Address: ${entry.Street_Address}, ${cityLabel}, ${stateLabel} <br>
        Stalls: ${entry.Stalls} <br>
        kW: ${entry.kW}<extra></extra>`;


    // adding countries at root node
    if (!ids.includes(countryId)) {
        addNode(countryId, countryLabel, 'root', countryName);
    }
    // adding states at countries node
    if (!ids.includes(stateId)) {
        addNode(stateId, stateLabel, countryId, stateName) ;
    }
    //addind cities at state node
    if (!ids.includes(cityId)) {
        addNode(cityId, cityLabel, stateId, cityName);
    }
    // adding superchargers at citi node
    addNode(superchargerId, superchargerLabel, cityId, superchargerHoverText);
});

// creating sunburst chart
const data = [{
    type: 'sunburst',
    ids: ids,
    labels: labels,
    parents: parents,
    marker:{
        colorscale: "Electric",
    },
    //values: hovertexts, // Display hover text
    hovertemplate: hovertexts, // Customize which information to show on hover
    domain: {column: 0},
    maxdepth: 2,
    //insidetextorientation: "radial",
    //center: chartLabel,
    //innerRadius: 50,

}];

const layout = {
    margin: {l: 0, r: 0, t: 0, b: 0},
};

Plotly.newPlot('sunburst', data, layout);

});




