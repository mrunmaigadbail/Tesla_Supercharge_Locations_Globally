function do_work() {
    // extract user input
    // let min_launches = d3.select("#launch_filter").property("value");
    // min_launches = parseInt(min_launches);
    // let region = d3.select("#region_filter").property("value");
  
    // We need to make a request to the API
    let url = `/api/v1.0/get_dashboard/${min_launches}/${region}`;
    d3.json(url).then(function (data) {
  
      // create the graphs
      make_bar(data.bar_data);
      make_bouble(data.bouble_data);
      make_table(data.table_data);
      make_line(data.line_data)
      //make_sunburst(data.sunbusrt_data)
    });
  }
  
  function make_table() {
    // select table
    let table = d3.select("#data_table");
    let table_body = table.select("tbody");
    table_body.html(""); // destroy any existing rows
  
    // create table
    for (let i = 0; i < filtered_data.length; i++){
      // get data row
      let data_row = filtered_data[i];
  
      // creates new row in the table
      let row = table_body.append("tr");
      row.append("td").text(data_row.name);
      row.append("td").text(data_row.full_name);
      row.append("td").text(data_row.region);
      row.append("td").text(data_row.latitude);
      row.append("td").text(data_row.longitude);
      row.append("td").text(data_row.launch_attempts);
      row.append("td").text(data_row.launch_successes);
      row.append("td").text(data_row.launch_attempts - data_row.launch_successes);
    }
  }
  
  function make_pie(filtered_data) {
    // sort values
    filtered_data.sort((a, b) => (b.launch_attempts - a.launch_attempts));
  
    // extract data for pie chart
    let pie_data = filtered_data.map(x => x.launch_attempts);
    let pie_labels = filtered_data.map(x => x.name);
  
    let trace1 = {
      values: pie_data,
      labels: pie_labels,
      type: 'pie',
      hoverinfo: 'label+percent+name',
      hole: 0.4,
      name: "Attempts"
    }
  
    // Create data array
    let data = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: "SpaceX Launch Attempts",
    }
  
    Plotly.newPlot("pie_chart", data, layout);
  }
  
  function make_bar(filtered_data) {
    // sort values
    filtered_data.sort((a, b) => (b.launch_attempts - a.launch_attempts));
  
    // extract the x & y values for our bar chart
    let bar_x = filtered_data.map(x => x.name);
    let bar_text = filtered_data.map(x => x.full_name);
    let bar_y1 = filtered_data.map(x => x.launch_attempts);
    let bar_y2 = filtered_data.map(x => x.launch_successes);
  
    // Trace1 for the Launch Attempts
    let trace1 = {
      x: bar_x,
      y: bar_y1,
      type: 'bar',
      marker: {
        color: "skyblue"
      },
      text: bar_text,
      name: "Attempts"
    };
  
    // Trace 2 for the Launch Successes
    let trace2 = {
      x: bar_x,
      y: bar_y2,
      type: 'bar',
      marker: {
        color: "firebrick"
      },
      text: bar_text,
      name: "Successes"
    };
  
    // Create data array
    let data = [trace1, trace2];
  
    // Apply a title to the layout
    let layout = {
      title: "SpaceX Launch Results",
      barmode: "group",
      // Include margins in the layout so the x-tick labels display correctly
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar_chart", data, layout);
  
  }
  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default
  do_work();
  
// function make_states()

  const countryStates = {
    "Australia":['ACT', 'NSW', 'Qld', 'SA', 'Tas', 'Vic', 'WA'],
    "Austria":['Carinthia', 'Lower Austria', 'Salzburg', 'Styria', 'Tyrol', 'Upper Austria', 'Vienna', 'Vorarlberg'],
    "Belgium":['Antwerp', 'Brussels Capital Region', 'East Flanders', 'Flemish Brabant', 'Hainaut', 'Limburg', 'LiÃ¨ge', 'Luxembourg', 'Namur', 'Walloon Brabant', 'West Flanders'],
    "Bulgaria":['Plovdiv', 'Sofia City'],
    "Canada":['AB', 'BC', 'MB', 'NB', 'NS', 'ON', 'PEI', 'QC', 'SK'],
    "China":['Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hong Kong', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Macau', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'],
    "Czech Republic":['Central Bohemian', 'Olomouc', 'Plze?', 'South Bohemian', 'South Moravian', 'Vyso?ina', 'ÃstÃ­ nad Labem'],
    "Denmark":['Midtjylland', 'Nordjylland', 'Sjælland', 'Syddanmark'],
    "Finland":['Central Finland', 'Kainuu', 'Kymenlaakso', 'Lapland', 'North Karelia', 'North Ostrobothnia', 'North Savo', 'Pirkanmaa', 'Päijät-Häme', 'Satakunta', 'South Karelia', 'South Ostrobothnia', 'South Savo', 'Southwest Finland'],
    "France":['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Grand Est', 'Hauts-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', "Provence-Alpes-Côte d'Azur", "Provence-Alpes-Côte dAzur",'Île-de-France'],
    "Germany":['Baden-WÃ¼rttemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Hamburg', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
    "Greece":['Attica', 'Central Greece', 'Thessaly', 'Western Greece'],
    "Hungary":['Central Hungary', 'Northern Great Plain', 'Northern Hungary', 'Southern Great Plain', 'Western Transdanubia'],
    "Iceland":['Capital Region', 'Eastern Region', 'Northeastern Region', 'Northwestern Region', 'Southern Region'],
    "Ireland":['Connacht', 'Leinster', 'Munster'],
    "Israel":['Haifa'],
    "Italy":['Abruzzo', 'Aosta Valley', 'Apulia', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Trentino-South Tyrol', 'Tuscany', 'Umbria', 'Veneto'],
    "Japan":['???', '????', 'Aichi', 'Aichi-ken', 'Chiba', 'Fukui', 'Fukushima', 'Hiroshima', 'Hokkaido', 'Hy?go', 'Hyogo', 'Ibaraki', 'Ishikawa', 'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto', 'Kyoto', 'Mie', 'Miyazaki', 'Nara', 'Niigata', 'Okayama Prefecture', 'Osaka', 'Saitama', 'Shiga', 'Shizuoka', 'Shizuoka Prefecture', 'Tokyo', 'Tottori', 'Yamagata', 'Yamanashi'],
    "Kazakhstan":['Almaty', 'Astana'],
    "Liechtenstein":['Oberland'],
    "Lithuania":['Kaunas'],
    "Luxembourg":['Luxembourg'],
    "Mexico":['Aguascalientes', 'Baja California', 'Chihuahua', 'Coahuila', 'Durango', 'Guanajuato', 'Guerrero', 'Jalisco', 'Mexico', 'Mexico City', 'MichoacÃ¡n', 'Morelos', 'MÃ©xico', 'Nayarit', 'Nuevo Leon', 'Nuevo LeÃ³n', 'Puebla', 'QuerÃ©taro', 'Quintana Roo', 'San Luis PotosÃ­', 'Sinaloa', 'Sonora', 'Yucatan', 'YucatÃ¡n'],
    "Netherlands":['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'North Brabant', 'North Holland', 'Overijssel', 'South Holland', 'Utrecht', 'Zeeland'],
    "New Zealand":['All'],
    "Norway":['Agder', 'Innlandet', 'MÃ¸re og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 'Troms og Finnmark', 'TrÃ¸ndelag', 'Vestfold og Telemark', 'Vestland', 'Viken'],
    "Poland":['?Ã³d?', 'Greater Poland', 'Kuyavia-Pomerania', 'Lesser Poland', 'Lower Silesia', 'Lublin', 'Masovia', 'Podlasie', 'Silesia', 'Subcarpathia'],
    "Portugal":['Alentejo', 'Algarve', 'Centro', 'Norte'],
    "Romania":['Bucure?ti', 'Centru', 'Nord-Vest', 'Sud-Est', 'Sud-Muntenia', 'Vest'],
    "Russia":['Moscow Oblast'],
    "Serbia":['Belgrade', 'Southern and Eastern Serbia'],
    "Slovakia":['BanskÃ¡ Bystrica', 'Bratislava', 'KoÂice', 'Âilina'],
    "Slovenia":['Central Slovenia', 'Drava', 'LittoralÂInner Carniola', 'Upper Carniola'],
    "South Korea":['Busan', 'Chungcheongbuk', 'Chungcheongnam', 'Daegu', 'Daejeon', 'Gangwon', 'Gwangju', 'Gyeonggi', 'Gyeongsangbuk', 'Gyeongsangnam', 'Incheon', 'Jeju', 'Jeollabuk', 'Jeollanam', 'Sejong', 'Seoul'],
    "Spain":['Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Cantabria', 'Castile and LeÃ³n', 'Castilla-La Mancha', 'CastillaÂLa Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarre', 'Valencia'],
    "Sweden":['BohuslÃ¤n', 'Dalarna', 'GÃ¤strikland', 'Halland', 'HÃ¤lsingland', 'HÃ¤rjedalen', 'JÃ¤mtland', 'Lappland', 'Medelpad', 'Norrbotten', 'NÃ¤rke', 'SkÃ¥ne', 'SmÃ¥land', 'SÃ¶dermanland', 'Uppland', 'VÃ¤rmland', 'VÃ¤sterbotten', 'VÃ¤stergÃ¶tland', 'VÃ¤stmanland', 'Ãngermanland', 'ÃstergÃ¶tland'],
    "Switzerland":['Aargau', 'Basel-Landschaft', 'Bern', 'Fribourg', 'Grisons', 'Lucerne', 'Nidwalden', 'Schaffhausen', 'Schwyz', 'Solothurn', 'St. Gallen', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zurich'],
    "Taiwan":['Changhua', 'Chiayi', 'Chiyai', 'Hsinchu', 'Hualien', 'Kaohsiung', 'Keelung', 'Miaoli', 'Nantou', 'New Taipei', 'Pingtung', 'Taichung', 'Tainan', 'Taipei', 'Taitung', 'Taoyuan', 'Yilan', 'Yunlin'],
    "Thailand":['Bangkok'],
    "Turkey":['Marmara'],
    "USA":['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
    "United Arab Emirates":['Dubai', 'Sharjah'],
    "United Kingdom":['England', 'Northern Ireland', 'Scotland', 'Wales']
   
};