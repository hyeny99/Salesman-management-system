//OpenCRX

const axios = require('axios');
const Customer = require('../models/Customer');
const product = require('../models/Product');

const { diffIndexes } = require('../models/EvaluationRecord');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = {
    username: 'guest',
    password: 'guest',
};

const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
};

async function getSalesOrder() {
    //SalesOrder
    const salesOrder = await axios.get(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    var salesOrderList = salesOrder.data.objects;

    return salesOrderList;
}
async function getidSalesOrder(url) {



    if (url) {
        let idString = [];
        let idValue = [];
        //get sales Order ID 
        for (let index = 0; index < url.length; index++) {
            const salesOrderIdentity = url[index].identity;
            string = salesOrderIdentity.split("/");
            idString.push(string);
        }
        //get the id for each sales Order
        for (let index = 0; index < idString.length; index++) {
            idValue.push(idString[index][8])
        }
        //console.log(idValue);
        return idValue;
    }
}

module.exports = {
    loadEvalutionRecord: async function loadEvalutionRecord() {
        try {

            let evaluationRecordList = [];
            let salesOrderList = await getSalesOrder();
            let salesOrderGovIDList = [];

            for (let index = 0; index < salesOrderList.length; index++) {

                //salesMan Data
                const baseUrlSalesRep = salesOrderList[index].salesRep['@href'];
                const salesRepList = await axios.get(`${baseUrlSalesRep}`, config);
                var salesManData = salesRepList.data;
                var govermentID = salesRepList.data.governmentId;
                var mySalesOrderGovIdlist = { 'govermentID': govermentID, 'salesOrder': salesOrderList[index] };
                salesOrderGovIDList.push(mySalesOrderGovIdlist);

            }


            //find all goverment ID that has a sales order 
            let GovID = salesOrderGovIDList.map(value => value.govermentID);
            let governmentIdList = [...new Set(GovID)];



            for (let index1 = 0; index1 < governmentIdList.length; index1++) {

                let salesFilter = salesOrderGovIDList.filter(function (item) { return item.govermentID == governmentIdList[index1]; });
                let allProduct = [];
                let salesOrderByGovID = salesFilter.map(value => value.salesOrder);
                var myProductList = [];

                //console.log(salesOrderByGovID);

                let idString = await getidSalesOrder(salesOrderByGovID);
                for (let index = 0; index < salesFilter.length; index++) {


                    const baseUrlCustomer = salesOrderByGovID[index].customer['@href'];
                    const customers = await axios.get(`${baseUrlCustomer}`, config);
                    var customersData = customers.data;
                    var accountRating = customersData.accountRating;
                    var customersName = customersData.fullName;

                    var myCustomer = {
                        clientName: customersName || null,
                        itemsSold: quantity || null,
                        ranking: accountRating || null,
                    };

                    const baseUrlPosition = idString[index];

                    const position = await axios.get(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${baseUrlPosition}/position`, config);


                    var positionList = position.data.objects;

                    if (positionList)
                        //console.log(positionList);

                    if (positionList) {

                        for (let index2 = 0; index2 < positionList.length; index2++) {

                            //console.log(index)
                            var quantity = positionList[index2].quantity;
                            var positionData = positionList[index2].product;

                            const baseUrlProduct = positionData['@href'];
                            const product = await axios.get(`${baseUrlProduct}`, config);

                            var productList = product.data;
                            var productName = productList.name;



                            var myCustomerList = [];
                            let found = false;
                            if (myProductList.length == 0) {
                                var myCustomer = {
                                    clientName: customersName || null,
                                    itemsSold: quantity || null,
                                    ranking: accountRating || null,
                                };
                                myCustomerList.push(myCustomer);
                                const myProduct = {
                                    name: productName || null,
                                    customerList: myCustomerList || null,

                                };
                                myProductList.push(myProduct);
                                found = true;
                            }
                            else {

                                for (let i = 0; i < myProductList.length && found == false; i++) {

                                    if (myProductList[i].name == productName) {
                                        var myCustomer = {
                                            clientName: customersName || null,
                                            itemsSold: quantity || null,
                                            ranking: accountRating || null,
                                        };


                                        myProductList[i].customerList.push(myCustomer);
                                        found = true;
                                        break;


                                    }
                                    else {
                                        continue;
                                    }

                                }
                                if (found == false) {

                                    var myCustomer = {
                                        clientName: customersName || null,
                                        itemsSold: quantity || null,
                                        ranking: accountRating || null,
                                    };
                                    myCustomerList.push(myCustomer);
                                    const myProduct = {
                                        name: productName || null,
                                        customerList: myCustomerList || null,

                                    };
                                    myProductList.push(myProduct);
                                }

                            }


                        }

                    }

                }

                const EV = {
                    sid: governmentIdList[index1] || 0,
                    //govermentID,
                    productList: myProductList || null,
                    //productlist ,
                    socialPerformance: null
                };
                //console.log(EV)

                evaluationRecordList.push(EV);


            }
            console.log('openCRX adapter is working.');
            return evaluationRecordList;
        }
        catch (error) {
            console.log(error);
        }

    }
}
