const buildMood = process.env.REACT_APP_DOMAIN_TYPE;
let setBaseUrl=process.env.REACT_APP_BACKEND_BASE_URL

if(buildMood == 'dev') {
  setBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;  
  console.log(setBaseUrl)
}

export  {setBaseUrl};