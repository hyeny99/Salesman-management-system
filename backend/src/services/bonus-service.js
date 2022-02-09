const ER = require('../models/EvaluationRecord');
const SalesMan = require('../models/SalesMan');

exports.calculateBonus = async (sid) => {

    const salesman = await SalesMan.findOne({ sid });
    const eval = await ER.findOne({ sid });
    let bonus = 0;

    if ( salesman && eval ) {
        let productlist = eval.productList;

        productlist.forEach((product) => {
            let customerlist = product.customerList;
            
            customerlist.forEach((customer) => {
                bonus += customer.itemsSold * 30;
                
                if (customer.ranking === 1){
                    bonus += 300;
                } else if (customer.ranking === 2) {
                    bonus += 200;
                } else if (customer.ranking === 3) {
                    bonus += 100;
                }
            });
        });    
            
        const d = new Date();
        let year = d.getFullYear();
            
        const bonusSalary = ({
            year: Number(year),
            value: Number(bonus)
        });
    
        const filter = { sid };
        const update = { bonusSalary };
        await SalesMan.findOneAndUpdate( filter, update );
        // salesman.bonusSalary = bonusSalary;
        // await salesman.update();
    }
    
    
    
};