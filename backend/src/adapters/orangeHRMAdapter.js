const axios = require('axios');
const qs = require('node:querystring');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
const SalesMan = require('../models/SalesMan');
// const BonusSalary= require('../models/BonusSalary');

const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'demouser',
    password: '*Safb02da42Demo$'
});

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }
};

async function getBearerToken() {
    let res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    let token = res.data.access_token;
    //console.log(token) ;
    return token;
}

module.exports = {

    loadSalesMen: async function loadSalesMen() {
        let token = await getBearerToken();
        let res = await axios.get(`${baseUrl}/api/v1/employee/search`, { headers: { "Authorization": `Bearer ${token}` } })
        //console.log(res.data.data[0]);
        let salesMenJSONList = res.data.data;
        let salesMenObjectList = [];

        console.log('orangeHRM adapter is working.');
        let bonusSalaryObject = {
            value: 0,
            year: 2022
        };

        salesMenJSONList.forEach(element => {

            //console.log(element.);
            //let bonus = loadBonussalary(element.id);

            if (element.jobTitle == "Senior Salesman") {

                const salesMan = {
                    sid: element.code,
                    name: element.firstName + " " + element.lastName,
                    department: element.jobTitle || ' ',
                    bonusSalary: null
                }
                //console.log(salesMan);

                salesMenObjectList.push(salesMan);
            }
        });
        return salesMenObjectList;
    },

}


const loadBonussalary = async (id) =>{
    let token = await getBearerToken();
    let res = await axios.get(`${baseUrl}/api/v1/employee/9/bonussalary`, { headers: { "Authorization": `Bearer ${token}` } })
        //console.log(res.data.data[0]);
    //console.log(res.data);
    return res.data;
}


const updateBonus = async () => {
    
    let token = await getBearerToken();
    //const bonusJson = JSON.stringify(bonus);

    const bonus = {
        year: '2023',
        value: '123'
    }

    bonusJSON = JSON.stringify(bonus);
    
    await axios.post(
        `${baseUrl}/api/v1/employee/31/bonussalary`, {year: 2023},
        { headers: { "Authorization": `Bearer ${token}` } } )
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
}

// updateBonus();
 //loadBonussalary();