document.onload=change_text('Dashboard');
window.location.href = '#tab-dashboard';
const checkbox = document.querySelector("#checkmode");
const html = document.querySelector("html");
var last="nav-tab1";
document.onload=changeMainTab(last);
var lastmode;
      const toggleDarkMode = function () {
        if(checkbox.checked)
        {html.classList.add("dark");
          
          
        }
        else
        { html.classList.remove("dark");
        }
      }
      toggleDarkMode();
      checkbox.addEventListener("click",() => {    
        toggleDarkMode();
        changeMainTab(last);    
   });


function changeMainTab(lasttab)
{
  
    if((checkbox.checked))
      {
        document.getElementById(lasttab).classList.remove("bg-slate-100");
        document.getElementById(lasttab).classList.remove("text-black");
        
        document.getElementById(lasttab).classList.add("bg-gray-800");
        document.getElementById(lasttab).classList.add("text-white");
        
      }
      else
      {
        document.getElementById(lasttab).classList.remove("bg-gray-800");
        document.getElementById(lasttab).classList.remove("text-white");

        document.getElementById(lasttab).classList.add("bg-slate-100");
        document.getElementById(lasttab).classList.add("text-black");
      }
}
function changeActiveTab(event,tabID,navtab)
{
    darkcheck=document.getElementById("checkmode")
    if(darkcheck.checked)
    {
      var tabbg="bg-gray-800";
      var tabnobgtxt="text-slate-100";
      var tabtxt="text-white";
      var bg="bg-slate-800";
    }
    else
    {
      var tabbg="bg-slate-100";
      var tabnobgtxt="text-white";
      var tabtxt="text-black";
      var bg="bg-blue-800";
    }

    if(true)
    {
      let element = event.target;
      while(element.nodeName !== "A"){
        element = element.parentNode;
      }
      ulElement = element.parentNode.parentNode;
      aElements = ulElement.querySelectorAll("li > a");
      tabDisp=document.getElementsByClassName('tabList');
      cdf=document.getElementsByClassName("f-cornerdiv");
      cdb=document.getElementsByClassName("b-cornerdiv");
      for(let i = 0 ; i < aElements.length; i++)
      {
          
        cdb[i].classList.remove("block");
        cdf[i].classList.remove("block");
          cdf[i].classList.add("hidden");
          cdb[i].classList.add("hidden");
          
         
          aElements[i].classList.remove(tabtxt);
          aElements[i].classList.remove(tabbg);
          aElements[i].classList.add(tabnobgtxt);
          
         if(aElements[i].classList.contains("bg-slate-100"))
         {
          aElements[i].classList.remove("bg-slate-100");
         }
         if(aElements[i].classList.contains("bg-gray-800"))
         {
          aElements[i].classList.remove("bg-gray-800");
         }
          aElements[i].classList.add("hovertabs");
          
         
          tabDisp[i].classList.add("hidden");
          tabDisp[i].classList.remove("block");
      }
      element.classList.remove("hovertabs");
      element.classList.remove(tabnobgtxt);
      
      element.classList.add(tabtxt);      
      element.classList.add(tabbg);
      document.getElementById("f-"+navtab).classList.remove("hidden");
      document.getElementById("b-"+navtab).classList.remove("hidden");
      document.getElementById("f-"+navtab).classList.add("block");
      document.getElementById("b-"+navtab).classList.add("block");
  
    }
      

      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
      
    last=navtab;  
    }
    
    


function changeActiveTabSmall(tabID,text)
{
    
      element=document.getElementById(text);
      aElements = document.getElementsByClassName("tabtxt");
      tabDisp=document.getElementsByClassName('tabList');
      for(let i = 0 ; i < aElements.length; i++)
      {
          aElements[i].classList.remove("text-white");
          aElements[i].classList.add("text-slate-300");
         
          tabDisp[i].classList.remove("block");
          tabDisp[i].classList.add("hidden"); 
      }
      
      element.classList.remove("text-slate-300");
      element.classList.add("text-white");      
      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
      
      
    }
    
    

function change_text(text)
{
    document.getElementById("head-tab").innerHTML=text;
}
var notifbox = document.getElementById('notif-content');
var notifbtn = document.getElementById('notif-btn');
if(document.getElementById('notif-content').style.display=="block")
{
    document.addEventListener('click', function(event) {
        var isClickInside = notifbox.contains(event.target);
        var isbtn = notbtn.contains(event.target);
        if (event.target.matches('.notification-content') || event.target.matches('#notif-btn')) {
           
            document.getElementById('notif-content').style.display="block";
            
        }
        else 
        {
          document.getElementById('notif-content').style.display="none";
        } 
          
        
    });
  }
 function toggleColumn(name){
  
  document.getElementById(name).classList.toggle("hidden");

 }
function display_column(name)
{
  document.getElementById(name).style.display="block";
}



function hide_column(name)
{
    document.getElementById(name).style.display="none";
}
var SelectText = new Array()
SelectText[0] = "Last Week";
SelectText[1] = "Last Month";
SelectText[2] = "Last Year";
SelectText[3] = "Cumulative";
function getUsageHrs(txt){
txtSelected = txt.selectedIndex;
document.getElementById('usage_hrs').innerHTML = SelectText[txtSelected];
}
function getActualHrs(txt){
  txtSelected = txt.selectedIndex;
  document.getElementById('actual_hrs').innerHTML = SelectText[txtSelected];
  }
  const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{
        x: 3,
        y: 2
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      },  {
        x: 6,
        y: 0
      },{
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }],
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  new Chart("myChart1", config);

  const dataA = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{x: 3,y: 2},  {x: 2,y: 4}, {x: 6,y: 0},{x: 1,y: 5}],backgroundColor: 'rgb(255, 99, 132)'
    }],
  };
  const configa = {
    type: 'scatter',
    data: dataA,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  new Chart("myChart2", configa);
  const dataG = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{x: 3,y: 2},  {x: 2,y: 4}, {x: 6,y: 0},{x: 1,y: 5}],backgroundColor: 'rgb(255, 99, 132)'
    }],
  };
  const configg = {
    type: 'scatter',
    data: dataG,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  new Chart("myChart3", configg);
  const dataT= {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{x: 3,y: 2},  {x: 2,y: 4}, {x: 6,y: 0},{x: 1,y: 5}],backgroundColor: 'rgb(255, 99, 132)'
    }],
  };
  const configt = {
    type: 'scatter',
    data: dataT,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        },
        y: {
          title: {
            display: true,
            text: 'Your Title'
          }
        }
      }
    }
  };
  new Chart("myChart4", configt);


  function initMap() {
    
    const uluru = { lat: -25.344, lng: 131.031 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
  
  window.initMap = initMap;

  function changeActiveTeleTab(event, tabID,tabName)
  {
        document.getElementById('tele-heading').innerHTML=tabName;
        element=event.target;
        tabSelected=document.getElementsByClassName("tele-tab");
        sectionDiv=document.getElementsByClassName("teleDiv");
        
        for(let i = 0 ; i < tabSelected.length; i++)
      {
        tabSelected[i].classList.remove("active");
        sectionDiv[i].classList.remove("block");
        sectionDiv[i].classList.add("hidden");        
      }
      element.classList.add("active");
      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
      
      if(tabID=='gps-tracker')
      {
          document.getElementById('gps-buttons').classList.remove("hidden");
          document.getElementById('gps-buttons').classList.add("block");

      }
      else
      {
        document.getElementById('gps-buttons').classList.remove("block");
        document.getElementById('gps-buttons').classList.add("hidden");
      }
  }
  function changeActiveDevEventsTab(event, tabID)
  {
        element=event.target;
        tabSelected=document.getElementsByClassName("dev-event");
        sectionDisp=document.getElementsByClassName("devEvents");
        for(let i = 0 ; i < tabSelected.length; i++)
      {
        tabSelected[i].classList.remove("active");
        sectionDisp[i].classList.remove("block");
        sectionDisp[i].classList.add("hidden");
                  
      }
      element.classList.add("active");
      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
  }
 
  function showDiv(newID, oldID)
  {
    document.getElementById(oldID).classList.remove("block");
    document.getElementById(oldID).classList.add("hidden");
    document.getElementById(newID).classList.remove("hidden");
    document.getElementById(newID).classList.add("block");
  }

  let modal = document.getElementById("my-modal");

   function openModal(nm) {
    modal.style.display = "block";
    document.getElementById(nm).style.display="block";
    }
    
    function closeModal(nm) {
    modal.style.display = "none";
    document.getElementById(nm).style.display="none"
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
   

    function commDetails(){
      var checkBox = document.getElementById("showComm");
      
      var content = document.getElementsByClassName("showOnComm");
      
      if (checkBox.checked == true){
        for(let i = 0 ; i < content.length; i++)
          {
            
            content[i].classList.remove("hidden");
                     
          }
      } 
      else {
        for(let i = 0 ; i < content.length; i++)
          {
            
            content[i].classList.add("hidden");
                      
          }
      }
    }

    new TomSelect("#select-state",{
      maxItems: 3
    });
    function changeDetails(event, tabID)
    {
          
          element=event.target;
          tabSelected=document.getElementsByClassName("asset-details-tab");
          sectionDiv=document.getElementsByClassName("assetD-tabs");
          
          for(let i = 0 ; i < tabSelected.length; i++)
        {
          tabSelected[i].classList.remove("assetDetailsActive");
          sectionDiv[i].classList.remove("block");
          sectionDiv[i].classList.add("hidden");        
        }
        element.classList.add("assetDetailsActive");
        document.getElementById(tabID).classList.remove("hidden");
        document.getElementById(tabID).classList.add("block");
      } 
      function changeLeaseDetails(event, tabID)
    {
          
          element=event.target;
          tabSelected=document.getElementsByClassName("lease-details-tab");
          sectionDiv=document.getElementsByClassName("leaseD-tabs");
          
          for(let i = 0 ; i < tabSelected.length; i++)
        {
          tabSelected[i].classList.remove("assetDetailsActive");
          sectionDiv[i].classList.remove("block");
          sectionDiv[i].classList.add("hidden");        
        }
        element.classList.add("assetDetailsActive");
        document.getElementById(tabID).classList.remove("hidden");
        document.getElementById(tabID).classList.add("block");
      } 
      function changeAssetTDetails(event, tabID)
    {
          
          element=event.target;
          tabSelected=document.getElementsByClassName("asset-telematics-tab");
          sectionDiv=document.getElementsByClassName("assetT-tabs");
          
          for(let i = 0 ; i < tabSelected.length; i++)
        {
          tabSelected[i].classList.remove("assetDetailsActive");
          sectionDiv[i].classList.remove("block");
          sectionDiv[i].classList.add("hidden");        
        }
        element.classList.add("assetDetailsActive");
        document.getElementById(tabID).classList.remove("hidden");
        document.getElementById(tabID).classList.add("block");
      }
      function changetoTab(navtab)
      {
        darkcheck=document.getElementById("checkmode")
    if(darkcheck.checked)
    {
      var tabbg="bg-gray-800";
      var tabnobgtxt="text-slate-100";
      var tabtxt="text-white";
      var bg="bg-slate-800";
    }
    else
    {
      var tabbg="bg-slate-100";
      var tabnobgtxt="text-white";
      var tabtxt="text-black";
      var bg="bg-blue-800";
    }

      element=document.getElementById(navtab)
      aElements = document.getElementsByClassName("navbar-tab ");
    
      cdf=document.getElementsByClassName("f-cornerdiv");
      cdb=document.getElementsByClassName("b-cornerdiv");
      for(let i = 0 ; i < aElements.length; i++)
      {
          cdf[i].classList.remove("block");
          cdf[i].classList.add("hidden");
          cdb[i].classList.remove("block");
          cdb[i].classList.add("hidden");
          aElements[i].classList.remove(tabtxt);
          aElements[i].classList.remove(tabbg);
          aElements[i].classList.add(tabnobgtxt);
          
         if(aElements[i].classList.contains("bg-slate-100"))
         {
          aElements[i].classList.remove("bg-slate-100");
         }
         if(aElements[i].classList.contains("bg-gray-800"))
         {
          aElements[i].classList.remove("bg-gray-800");
         }
          aElements[i].classList.add("hovertabs");
          
         
      }
      element.classList.remove("hovertabs");
      element.classList.remove(tabnobgtxt);
      
      element.classList.add(tabtxt);      
      element.classList.add(tabbg);
      document.getElementById("f-"+navtab).classList.remove("hidden");
      document.getElementById("b-"+navtab).classList.remove("hidden");
      document.getElementById("f-"+navtab).classList.add("block");
      document.getElementById("b-"+navtab).classList.add("block");

    
    }
    function hidemenu(id)
    {
      b=document.getElementById(id);
      if(b.classList.contains("block"))
        {b.classList.remove("block");
        b.classList.add("hidden");}
      else if(b.classList.contains("hidden"))
        {b.classList.remove("hidden");
        b.classList.add("block");}
    }
    

      