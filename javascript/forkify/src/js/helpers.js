//The function below will return a promise which will reject after a certain period of time⭐⭐
//It will be used to make the request fail, this is important in order to prevent fetch function to
//run forever due to bad internet connection

import { TIMEOUt_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
  const fetchPro = uploadData
    ? fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  
      //If the fetching data takes more than 10s then timeout() will execute and throw the request too
      //long message and reject the promise
  
      const res = await Promise.race([fetchPro, timeout(TIMEOUt_SEC)]);
      // const res = await fetch(`${url}`);
  
      const data = await res.json();
  
      if (!res.ok) {
        //if the request is failed then throw the error(for ex: if recipe id is wrong)
        throw new Error(`${data.message} (${res.status})`);
      }
  
      return data;
  
      console.log(res, data);
    } catch (error) {
      //rethrowing the error, so that the promise which we actually get from the getJSON actually reject
      throw error;
    }
};

//The function getJSON will do the fetching the data from api and convert it into JSON

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);

//     //If the fetching data takes more than 10s then timeout() will execute and throw the request too
//     //long message and reject the promise

//     const res = await Promise.race([fetchPro, timeout(TIMEOUt_SEC)]);
//     // const res = await fetch(`${url}`);

//     const data = await res.json();

//     if (!res.ok) {
//       //if the request is failed then throw the error(for ex: if recipe id is wrong)
//       throw new Error(`${data.message} (${res.status})`);
//     }

//     return data;

//     console.log(res, data);
//   } catch (error) {
//     //rethrowing the error, so that the promise which we actually get from the getJSON actually reject
//     throw error;
//   }
// };

// //The function sendJSON will be used to send the data

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUt_SEC)]);
//     // const res = await fetch(`${url}`);

//     const data = await res.json(uploadData);

//     if (!res.ok) {
//       //if the request is failed then throw the error(for ex: if recipe id is wrong)
//       throw new Error(`${data.message} (${res.status})`);
//     }

//     return data;

//     console.log(res, data);
//   } catch (error) {
//     //rethrowing the error, so that the promise which we actually get from the getJSON actually reject
//     throw error;
//   }
// };
