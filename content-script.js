stocks = document.querySelectorAll('#pnlEqPendingDelivery tr.expand-box');

var brokerageAndTaxes = {
    common: {
        stt: 0.00025,
        exchange: 0.000017,
        gst: 0.18,
        sebi: 0.000001,
        stampDuty: 0.00003
    },
    intraDay: {
        brokerage: 0.00015
    },
    delivery: {
        brokerage: 0.0015
    }
};

var calculateLiveProfit = function(quantity, buyAmount, sellAmount) {
    var totalTransactionAmount = buyAmount + sellAmount;
    var intraDayBrokerage = brokerageAndTaxes.intraDay.brokerage * (buyAmount + sellAmount);
    console.log('intraDayBrokerage',intraDayBrokerage);
    var deliveryBrokerage = brokerageAndTaxes.delivery.brokerage * (buyAmount + sellAmount);
    console.log('deliveryBrokerage',deliveryBrokerage);
    var commonChargesTotal = +brokerageAndTaxes.common.exchange * totalTransactionAmount + brokerageAndTaxes.common.sebi * totalTransactionAmount;
    var intraDayGST = brokerageAndTaxes.common.gst * (intraDayBrokerage + commonChargesTotal);
    var deliveryGST = brokerageAndTaxes.common.gst * (deliveryBrokerage + commonChargesTotal);
    var stampDuty = brokerageAndTaxes.common.stampDuty * buyAmount;
    var stt = brokerageAndTaxes.common.stt * sellAmount;
    var intraDayTotalExpense = intraDayBrokerage + commonChargesTotal + intraDayGST + stampDuty + stt;
    var deliveryTotalExpense = deliveryBrokerage + commonChargesTotal + deliveryGST + stampDuty + stt;
    var intraDayNetProfit = sellAmount - buyAmount - intraDayTotalExpense;
    var deliveryNetProfit = sellAmount - buyAmount - deliveryTotalExpense;
    return deliveryNetProfit.toFixed(2);
}


document.querySelector('#pnlEqPendingDelivery thead tr th:nth-child(14)').innerHTML='Profits';
for(let i = 0; i < stocks.length; i++) {
    var quantity = stocks[i].getElementsByTagName('td')[3].innerHTML.replaceAll(' ', '').replaceAll('\n', '');
    var averagePrice = stocks[i].getElementsByTagName('td')[5].innerHTML.replaceAll(' ', '').replaceAll('\n', '').replaceAll(',', '');
    var currentPrice = stocks[i].getElementsByTagName('td')[6].querySelector('td:nth-child(7) a').innerHTML;
    var buyAmount = quantity*averagePrice;
    var sellAmount = quantity*currentPrice;
        var totalTransactionAmount = buyAmount + sellAmount;
        var intraDayBrokerage = brokerageAndTaxes.intraDay.brokerage * (buyAmount + sellAmount);
        console.log('intraDayBrokerage',intraDayBrokerage);
        var deliveryBrokerage = brokerageAndTaxes.delivery.brokerage * (buyAmount + sellAmount);
        var commonChargesTotal = +brokerageAndTaxes.common.exchange * totalTransactionAmount + brokerageAndTaxes.common.sebi * totalTransactionAmount;
        var intraDayGST = brokerageAndTaxes.common.gst * (intraDayBrokerage + commonChargesTotal);
        var deliveryGST = brokerageAndTaxes.common.gst * (deliveryBrokerage + commonChargesTotal);
        var stampDuty = brokerageAndTaxes.common.stampDuty * buyAmount;
        var stt = brokerageAndTaxes.common.stt * sellAmount;
        var intraDayTotalExpense = intraDayBrokerage + commonChargesTotal + intraDayGST + stampDuty + stt;
        var deliveryTotalExpense = deliveryBrokerage + commonChargesTotal + deliveryGST + stampDuty + stt;
        var intraDayNetProfit = sellAmount - buyAmount - intraDayTotalExpense;
        var deliveryNetProfit = sellAmount - buyAmount - deliveryTotalExpense;
    stocks[i].getElementsByTagName('td')[13].innerHTML = deliveryNetProfit.toLocaleString('en-IN', {maximumFractionDigits:2});
    if (deliveryNetProfit>0){
        stocks[i].getElementsByTagName('td')[13].style.backgroundColor = 'lightgreen';
    }else{
        stocks[i].getElementsByTagName('td')[13].style.backgroundColor = 'tomato';
    }
}