//XMLHttp Global variables
var xhr = new XMLHttpRequest();

var StockInfo = document.getElementById("StockInfo");

//Starting declare functions
function hideLoginForm(){
  document.getElementById("hiddenLoginForm").style.visibility = "hidden";
  document.getElementById("logoutButton").style.visibility = "hidden";
  document.getElementById("loginButton").style.visibility = "visible";
}
function showLoginForm(){
  document.getElementById("hiddenLoginForm").style.visibility = "visible";
  document.getElementById("loginButton").style.visibility = "hidden";
}
//initializing login function
function LoginFunction(){
  var x=document.getElementById("username").value.trim();
  var y=document.getElementById("password").value.trim();

  var url = "login.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("username="+x+"&password="+y);
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
      var response =  xhr.response;
      var Uname = response;
      alert("Welcome "+Uname);
      hideLoginForm();
      document.querySelector("#name").innerHTML=Uname+"'s Stocks: ";
      document.getElementById("logoutButton").style.visibility = "visible";
      document.getElementById("loginButton").style.visibility = "hidden";
      getUserStocks();
    }
    else if(xhr.readyState == 4 && xhr.status == 401)
    {
      alert("Sorry please try again..");
    }
  };
}

function logout(){
  document.getElementById("Stocks").style.visibility = "hidden";
  document.getElementById("stocks_table_body").innerHTML = "";
  document.getElementById("StockInfo").innerHTML = "";
  document.getElementById("logoutButton").style.visibility = "hidden";
  document.getElementById("loginButton").style.visibility = "visible";
  document.getElementById("name").style.visibility = "hidden";
  var url = "login.php";
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
      alert("Bye..!");
    }
  };
}

function getUserStocks() {

  document.getElementById("Stocks").style.visibility="visible";
  var tbody = document.querySelector("#stocks_table_body");
  tbody.innerHTML=""
  var url = "Stocks.php";
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      var response =  JSON.parse(xhr.response);
      response.forEach(function(elmt) {
        var symbol = elmt['recentchangedirection']=='Down'?"- ":"+ " ;
        tbody.innerHTML += "<tr><td onclick='getStockDetails("+elmt['id']+")'>"+elmt['companyname']+"</td><td>"+symbol+elmt['recentchange']+"</td></tr>";
      })
    }
  }
}

function getStockDetails(id) {
  var url = "Stocks.php"+"?id="+id;
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      var response =  JSON.parse(xhr.response);
      StockInfo=document.getElementById("StockInfo");
      var symbol = response.recentchangedirection =='Down'?"- ":"+ " ;
      StockInfo.innerHTML="<hr>"+
      "<h3>"+response.companyname+"  <button type='button' onclick='removeUserStock("+response.id+")'>Remove</button></h3>"+
      "<h4>Current Price:    "+response.currentprice+"</h4>"+
      "<h4>Recent Movement:    "+symbol+response.recentchange+"</h4>"+
      "<h4>Annual trend:    "+response.annualtrend+"</h4>"+
      "<h4>Notes:  <span id='note'>  "+response.note+"  </span> <span id='action'> <button type='button' onclick='editNote("+response.id+",this)'>Edit</button></span></h4>"
    }
  }
}

function editNote(id) {
  document.getElementById("action").innerHTML="<button type='button' onclick='saveNote("+id+")'>Save</button>";
  note=document.getElementById("note");
  data=note.innerHTML;
  note.innerHTML='<input type="text" id="noteToSave" value="'+data+'">'
}

function saveNote(id) {
  data=document.getElementById("noteToSave").value;
  var url = "Stocks.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("note="+data+"&id="+id);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      document.getElementById("action").innerHTML="<button type='button' onclick='editNote("+id+",this)'>Edit</button>";
      note.innerHTML=data;
    }
  }
}

function removeUserStock(id) {
  var url = "Stocks.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("action=delete&id="+id);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      document.getElementById("StockInfo").innerHTML="";
      getUserStocks();
    }
  }
}

function showAvailableStocks() {
  StockInfo=document.getElementById("StockInfo");
  StockInfo.innerHTML="<h4>Select stocks to add:</h4>";
  var url = "Stocks.php?available=true";
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      var response =  JSON.parse(xhr.response);
      response.forEach(function(elmt) {
        StockInfo.innerHTML+='<input type="checkbox" name="stocksCheckbox" value="'+elmt.id+'">'+elmt.companyname+'<br>';
      })
      StockInfo.innerHTML+='<button type="button" onclick="addUserStocks()">Add</button>';
    }
  }
}

function addUserStocks() {
  stocksArr=[]
  document.getElementsByName("stocksCheckbox").forEach(function(elmt) {
    if (elmt.checked) {
      stocksArr.push(elmt.value);
    }
  })
  var url = "Stocks.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json")
  xhr.send(JSON.stringify(stocksArr));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      var response =  xhr.response;
      getUserStocks();
    }
  }
  document.getElementById("StockInfo").innerHTML="";
}
