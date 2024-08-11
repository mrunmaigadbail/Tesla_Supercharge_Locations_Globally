const countrySelect = document.getElementById("countrySelect");
const stateSelect = document.getElementById("stateSelect");

//so far this is working to populate the countries and corresponsding states
// Data structure mapping countries to states
const countryStates = {
    "Australia":['All','ACT', 'NSW', 'Qld', 'SA', 'Tas', 'Vic', 'WA'],
    "Austria":['All','Carinthia', 'Lower Austria', 'Salzburg', 'Styria', 'Tyrol', 'Upper Austria', 'Vienna', 'Vorarlberg'],
    "Belgium":['All','Antwerp', 'Brussels Capital Region', 'East Flanders', 'Flemish Brabant', 'Hainaut', 'Limburg', 'LiÃ¨ge', 'Luxembourg', 'Namur', 'Walloon Brabant', 'West Flanders'],
    "Bulgaria":['All','Plovdiv', 'Sofia City'],
    "Canada":['All','AB', 'BC', 'MB', 'NB', 'NS', 'ON', 'PEI', 'QC', 'SK'],
    "China":['All','Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hong Kong', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Macau', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'],
    "Czech Republic":['All','Central Bohemian', 'Olomouc', 'Plze?', 'South Bohemian', 'South Moravian', 'Vyso?ina', 'ÃstÃ­ nad Labem'],
    "Denmark":['All','Midtjylland', 'Nordjylland', 'Sjælland', 'Syddanmark'],
    "Finland":['All','Central Finland', 'Kainuu', 'Kymenlaakso', 'Lapland', 'North Karelia', 'North Ostrobothnia', 'North Savo', 'Pirkanmaa', 'Päijät-Häme', 'Satakunta', 'South Karelia', 'South Ostrobothnia', 'South Savo', 'Southwest Finland'],
    "France":['All','Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Grand Est', 'Hauts-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', "Provence-Alpes-Côte d'Azur", "Provence-Alpes-Côte dAzur",'Île-de-France'],
    "Germany":['All','Baden-WÃ¼rttemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Hamburg', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
    "Greece":['All','Attica', 'Central Greece', 'Thessaly', 'Western Greece'],
    "Hungary":['All','Central Hungary', 'Northern Great Plain', 'Northern Hungary', 'Southern Great Plain', 'Western Transdanubia'],
    "Iceland":['All','Capital Region', 'Eastern Region', 'Northeastern Region', 'Northwestern Region', 'Southern Region'],
    "Ireland":['All','Connacht', 'Leinster', 'Munster'],
    "Israel":['All','Haifa'],
    "Italy":['All','Abruzzo', 'Aosta Valley', 'Apulia', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Trentino-South Tyrol', 'Tuscany', 'Umbria', 'Veneto'],
    "Japan":['All','???', '????', 'Aichi', 'Aichi-ken', 'Chiba', 'Fukui', 'Fukushima', 'Hiroshima', 'Hokkaido', 'Hy?go', 'Hyogo', 'Ibaraki', 'Ishikawa', 'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto', 'Kyoto', 'Mie', 'Miyazaki', 'Nara', 'Niigata', 'Okayama Prefecture', 'Osaka', 'Saitama', 'Shiga', 'Shizuoka', 'Shizuoka Prefecture', 'Tokyo', 'Tottori', 'Yamagata', 'Yamanashi'],
    "Kazakhstan":['All','Almaty', 'Astana'],
    "Liechtenstein":['All','Oberland'],
    "Lithuania":['All','Kaunas'],
    "Luxembourg":['All','Luxembourg'],
    "Mexico":['All','Aguascalientes', 'Baja California', 'Chihuahua', 'Coahuila', 'Durango', 'Guanajuato', 'Guerrero', 'Jalisco', 'Mexico', 'Mexico City', 'MichoacÃ¡n', 'Morelos', 'MÃ©xico', 'Nayarit', 'Nuevo Leon', 'Nuevo LeÃ³n', 'Puebla', 'QuerÃ©taro', 'Quintana Roo', 'San Luis PotosÃ­', 'Sinaloa', 'Sonora', 'Yucatan', 'YucatÃ¡n'],
    "Netherlands":['All','Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'North Brabant', 'North Holland', 'Overijssel', 'South Holland', 'Utrecht', 'Zeeland'],
    "New Zealand":['All'],
    "Norway":['All','Agder', 'Innlandet', 'MÃ¸re og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 'Troms og Finnmark', 'TrÃ¸ndelag', 'Vestfold og Telemark', 'Vestland', 'Viken'],
    "Poland":['All','?Ã³d?', 'Greater Poland', 'Kuyavia-Pomerania', 'Lesser Poland', 'Lower Silesia', 'Lublin', 'Masovia', 'Podlasie', 'Silesia', 'Subcarpathia'],
    "Portugal":['All','Alentejo', 'Algarve', 'Centro', 'Norte'],
    "Romania":['All','Bucure?ti', 'Centru', 'Nord-Vest', 'Sud-Est', 'Sud-Muntenia', 'Vest'],
    "Russia":['All','Moscow Oblast'],
    "Serbia":['All','Belgrade', 'Southern and Eastern Serbia'],
    "Slovakia":['All','BanskÃ¡ Bystrica', 'Bratislava', 'KoÂice', 'Âilina'],
    "Slovenia":['All','Central Slovenia', 'Drava', 'LittoralÂInner Carniola', 'Upper Carniola'],
    "South Korea":['All','Busan', 'Chungcheongbuk', 'Chungcheongnam', 'Daegu', 'Daejeon', 'Gangwon', 'Gwangju', 'Gyeonggi', 'Gyeongsangbuk', 'Gyeongsangnam', 'Incheon', 'Jeju', 'Jeollabuk', 'Jeollanam', 'Sejong', 'Seoul'],
    "Spain":['All','Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Cantabria', 'Castile and LeÃ³n', 'Castilla-La Mancha', 'CastillaÂLa Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarre', 'Valencia'],
    "Sweden":['All','BohuslÃ¤n', 'Dalarna', 'GÃ¤strikland', 'Halland', 'HÃ¤lsingland', 'HÃ¤rjedalen', 'JÃ¤mtland', 'Lappland', 'Medelpad', 'Norrbotten', 'NÃ¤rke', 'SkÃ¥ne', 'SmÃ¥land', 'SÃ¶dermanland', 'Uppland', 'VÃ¤rmland', 'VÃ¤sterbotten', 'VÃ¤stergÃ¶tland', 'VÃ¤stmanland', 'Ãngermanland', 'ÃstergÃ¶tland'],
    "Switzerland":['All','Aargau', 'Basel-Landschaft', 'Bern', 'Fribourg', 'Grisons', 'Lucerne', 'Nidwalden', 'Schaffhausen', 'Schwyz', 'Solothurn', 'St. Gallen', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zurich'],
    "Taiwan":['All','Changhua', 'Chiayi', 'Chiyai', 'Hsinchu', 'Hualien', 'Kaohsiung', 'Keelung', 'Miaoli', 'Nantou', 'New Taipei', 'Pingtung', 'Taichung', 'Tainan', 'Taipei', 'Taitung', 'Taoyuan', 'Yilan', 'Yunlin'],
    "Thailand":['All','Bangkok'],
    "Turkey":['All','Marmara'],
    "USA":['All','AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
    "United Arab Emirates":['All','Dubai', 'Sharjah'],
    "United Kingdom":['All','England', 'Northern Ireland', 'Scotland', 'Wales']
   
};

// Populate state dropdown based on selected country
countrySelect.addEventListener("change", function() {
    const selectedCountry = countrySelect.value;
    console.log("Selected Country:", selectedCountry);

    const states = countryStates[selectedCountry];
    console.log("States for Selected Country:", states);

    // Clear the state dropdown first
    stateSelect.innerHTML = "";

    // Populate state dropdown with options for the selected country
    states.forEach(state => {
        const option = document.createElement("option");
        option.text = state;
        stateSelect.add(option);
    });
});

//making the bar
function updateBarChart(country, state) {
    fetch('/api/v1/updateBarChart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        // Handle the response
      })
      .catch(error => {
        console.error('Error:', error);
      })
    .then(response => response.json())
    .then(data => {
        const xValues = data.map(item => `${item.Country} - ${item.State}`);
        const yValues = data.map(item => item.Location_Count);

        const trace = {
            x: xValues,
            y: yValues,
            type: 'bar',
        };

        const layout = {
            title: 'Location Count by Country and State',
        };

        const plotData = [trace];

        Plotly.newPlot('barChart', plotData, layout);
    })
    // .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Call updateBarChart with default values or when dropdown values change
    const defaultCountry = 'All'; // Default country value
    const defaultState = 'All'; // Default state value
    updateBarChart(defaultCountry, defaultState);

    // Add event listeners to country and state dropdowns to update the chart
    document.getElementById('countryDropdown').addEventListener('change', function() {
        const selectedCountry = this.value;
        const selectedState = document.getElementById('stateDropdown').value;
        updateBarChart(selectedCountry, selectedState);
    });

    document.getElementById('stateDropdown').addEventListener('change', function() {
        const selectedCountry = document.getElementById('countryDropdown').value;
        const selectedState = this.value;
        updateBarChart(selectedCountry, selectedState);
    });
});