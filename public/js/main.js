/* time and Date code */

const currentDate=()=>{
		  
	     
		   const d=new Date();

                        const weekDay=["Sunday","Manday","Tusday","Wednesday","Trusday","Friday","Saturday"];   

                      const month=['January','February','March','April','May','June','July','August','September','October','November','December'];

                    const today_date=document.getElementById("today_date"); 
                     // console.log(month[d.getMonth()]);
                                 const dateVal=month[d.getMonth()];
			const dayVal=weekDay[d.getDay()];
	          const day=document.getElementById("day"); 
                                   day.innerText=dayVal+" "+d.getDate()+" "+dateVal;
                                let min="";
                           if(d.getMinutes()<10){
                              
                               min='0'+d.getMinutes();
                              }
                      else{
                            min=d.getMinutes();
                          }
            
                today_date.innerText="Time: "+d.getHours()+":"+min;
//console.log(d.getDate());
		  };
     
	window.setInterval("currentDate()",100);	 
 
		 
/*test

*/
/* this code for adl all dyanmic data */
const submitBtn=document.getElementById("submitBtn");
const cityName=document.getElementById("cityName");
const city_name=document.getElementById("city_name");
const temp=document.getElementById("temp");
const tempStatus=document.getElementById("temp_status");
const temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

 
const getInfo=async(event)=>{
 event.preventDefault();//page does not refresh
 let cityVal=cityName.value;
 
if(cityVal==""){
 city_name.innerText="Plz write any City name Before search";
 datahide.classList.add("data_hide");
 }else{
  try{
   let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=16d3b2b8616a52c4d4777b0123c2b1c3`;
   const response=await fetch(url);
    
   const data=await response.json();
   console.log(data);
   
  const arrData=[data];
   
   console.log(arrData[0].main.temp);
temp_real_val.innerText = arrData[0].main.temp;
   
  
 const temp_status=arrData[0].weather[0].main;
   
city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

//Condition check for weather status
console.log(temp_status);
  if(temp_status=="Clear"){
       tempStatus.innerHTML="<i class='fas  fa-sun' style='color: #eccc68;'></i>";
    }
 else if(temp_status=="Clouds"){
       tempStatus.innerHTML="<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
    }

else if(temp_status=="Rain"){
      tempStatus.innerHTML="<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
    }
else{
     
       tempStatus.innerHTML="<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
}


datahide.classList.remove('data_hide');
            cityVal = "";
   
   }catch{
        cityVal = " ";
            datahide.classList.add("data_hide");
        city_name.innerText="Plz Enter correct city name";
       }
  }
}
submitBtn.addEventListener('click',getInfo);

window.addEventListener("load",()=>{
  
let long;
let lat;
if(navigator.geolocation)
{
navigator.geolocation.getCurrentPosition((position)=>{
 
  long=position.coords.longitude;   
 lat=position.coords.latitude;
const proxy="https://robwu.nl/dump.php";

  const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude={part}&appid=16d3b2b8616a52c4d4777b0123c2b1c3`;
  
   fetch(api).then((response)=>{
        return response.json();
     }).then(data=>{
         const arrData=[data];
   
  // console.log(arrData);
temp_real_val.innerText = arrData[0].main.temp;
  //console.log(arrData[0].main.temp);
 const temp_status=arrData[0].weather[0].main;
   
  city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
const id=arrData[0].weather[0].id;
//Condition check for weather status
//console.log(id);
  if(id<300 && id>200){
//thunder-strome
  tempStatus.innerHTML="<i class='fas fa-wind' style='color: #f1f2f6;'></i>";
    }
 else if(id<400 && id>300){
       //cloud
tempStatus.innerHTML="<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
    }

else if(id<600 && id>500){
       //rain
tempStatus.innerHTML="<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
    }
else if(id<700 && id>600){
      //snow
tempStatus.innerHTML="<i class='fas fa-igloo' style='color: #a4b0be;'></i>";
    }

else if(id<800 && id>700){
//cloud
tempStatus.innerHTML="<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
       
    }
else{
     //sun
tempStatus.innerHTML="<i class='fas  fa-sun' style='color: #eccc68;'></i>";
       
}
datahide.classList.remove('data_hide');

     }) 
 }
)}
});