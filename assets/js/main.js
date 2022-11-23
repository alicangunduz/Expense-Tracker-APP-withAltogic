total()
list()
function gelirEkle() {
    const gelir = document.getElementById("gelir")
    const gelirDesc = document.getElementById("gelirDesc")
    
    
    var data = JSON.stringify({
    "amount": gelir.value,
    "isExpense": false,
    "desc": gelirDesc.value
    });

var config = {
  method: 'post',
  url: 'https://c1-europe.altogic.com/e:637954165e444064104c2e0b/expense_tracker',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  updatePage()
})
.catch(function (error) {
  console.log(error);
});

}

function giderEkle() {
    const gider = document.getElementById("gider")
    const giderDesc = document.getElementById("giderDesc")
    
    
    var data = JSON.stringify({
    "amount": '-'+gider.value,
    "isExpense": true,
    "desc": giderDesc.value
    });

var config = {
  method: 'post',
  url: 'https://c1-europe.altogic.com/e:637954165e444064104c2e0b/expense_tracker',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  updatePage()
})
.catch(function (error) {
  console.log(error);
});

}

function total() {
 
  
  
  var data = JSON.stringify({
  });

var config = {
method: 'get',
url: 'https://c1-europe.altogic.com/e:637954165e444064104c2e0b/getTotal',
headers: { 
  'Content-Type': 'application/json'
},
data : data
};

axios(config)
.then(function (response) {

document.getElementById("total").innerHTML = 'Toplam Bakiye : ' +response.data.revenue +'₺'

})
.catch(function (error) {
console.log(error);
});

}

function list() {
  var data = JSON.stringify({
  });

var config = {
method: 'get',
url: 'https://c1-europe.altogic.com/e:637954165e444064104c2e0b/expense_tracker',
headers: { 
  'Content-Type': 'application/json'
},
data : data
};

axios(config)
.then(function (response) {

let data=""
for(var i=0;i<response.data.result.length;i++){
  let count=i+1
  listData = document.getElementById("list").innerHTML
  document.getElementById("toplamIslem").innerText = 'Toplam İşlem Sayısı : ' +response.data.result.length
  let tarih = response.data.result[i].createdAt.split("T")[0]
  let saat = response.data.result[i].createdAt.split("T")[1].split(".")[0]
  document.getElementById("list").innerHTML = listData + '<tr id="color" class=""><td>'+response.data.result[i].amount+'₺</td><td>'+response.data.result[i].desc+'</td><td>'+tarih +' // '+ saat +'</td><td>'+response.data.result[i].isExpense+'</td></tr>'
  
   if(response.data.result[i].isExpense == false){
    document.querySelectorAll("#color")[i].classList.add("table-success")
    document.querySelectorAll("#color")[i].lastChild.innerHTML = `  <img src="/assets/img/plus.png" alt="" width="20" height="20">`
  }
  else if(response.data.result[i].isExpense == true){
    document.querySelectorAll("#color")[i].classList.add("table-danger")
    document.querySelectorAll("#color")[i].lastChild.innerHTML = `  <img src="/assets/img/minus-button.png" alt="" width="20" height="20">`

  }
}
})
.catch(function (error) {
console.log(error);
});
}



function updatePage() {
    document.getElementById("gider").value = ""
    document.getElementById("giderDesc").value = ""   
    document.getElementById("gelir").value = ""
    document.getElementById("gelirDesc").value = ""
    window.location.reload()
}
