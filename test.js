const express = require('express');
const app = express();
const fs = require('fs');
const readline = require('readline');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');






// Serve the static HTML file
app.use(express.static(__dirname));

// Route to provide data to the client
app.get('/data', (req, res) => {
	
	//console.log(req);
	
    let param1 = req.query.param1;
    let param2 = req.query.param2;


	console.log(param2);
	
    // You can process the parameters here as needed
    // For demonstration, let's just send them back as JSON
    //res.json({ param1, param2 });
	
	
    // Simulated server response with random data
    //const randomData = `Random data: ${Math.random()}`;
	//let output1 = `${param1} says ${param2}`;
	
    //res.send(output1);
	processData1(res, param2);
	
});



function processData1(res, data) {
	
	
	
 ////////////////////////////////////////////////////////////////////////////////////////////////
 // Define the URL of the website you want to download
const websiteURL = data;

// Function to download the HTML code of a website
async function downloadWebsiteHTML(url) {
  try {
    // Make an HTTP GET request to the website
    const response = await axios.get(url);

    if (response.status === 200) {
      // Save the HTML content to a file (e.g., website.html)
      fs.writeFileSync('result.html', response.data);
      console.log('Website HTML downloaded successfully.');
    } else {
      console.error(`Failed to download website. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function to download the HTML code of the website
downloadWebsiteHTML(websiteURL);
 
 
 
 
 
 
 
 
 ///////////////////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 
 
 
 // Replace 'your_html_file.html' with the path to your HTML file
const filePath = 'result.html';

const readStream = fs.createReadStream(filePath, 'utf-8');
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity, // Read lines until a newline character is encountered
});

let accumulatedLines = ''; // Initialize the variable to store accumulated lines

// Event handler for each line read
rl.on('line', (line) => {
  accumulatedLines += line + '\n'; // Append each line to the variable
});

// Event handler for when the file reading is complete
rl.on('close', () => {
  console.log('Finished reading the HTML file.');
 // console.log(accumulatedLines); // Log or process the accumulated lines as needed
});




 let priceStoreArray = [];
 let productURLArray = [];
 let productDescriptionArray = [];
 let imagePathStoreArray = [];
 

// Read the HTML content from the local file (e.g., sample.html)
const htmlFilePath = 'result.html'; // Replace with the path to your HTML file

fs.readFile(htmlFilePath, 'utf-8', (error, data) => {
  if (error) {
    console.error('Error reading the HTML file:', error);
    return;
  }

  const $ = cheerio.load(data); // Load the HTML content with Cheerio

 

  // Find all <div> elements with class "n-listing-card__price" and extract their text
  $('.v2-listing-card__info').each((index, element) => {

     // const title = $(element).find('.text-body').text().trim();
      const price = $(element).find('.currency-value').text().trim();
	  const productURL = $(element).parent().attr('href'); // Get the product's URL
	  const productTitle =$(element).parent().attr('title'); 

        //console.log(price);	
		priceStoreArray.push(price);
		productURLArray.push(productURL);
		productDescriptionArray.push(productTitle);
		
		//console.log(priceStoreArray[index]);
		
	
  });

  // Output the extracted prices
  //console.log('Extracted Prices:');
  //console.log(prices);
  
  
  
  
  
  
  
  
   fs.readFile(htmlFilePath, 'utf-8', (error, data) => {
  if (error) {
    console.error('Error reading the HTML file:', error);
    return;
  }

  const $ = cheerio.load(data); // Load the HTML content with Cheerio

  // Array to store the extracted prices
  const prices = [];

  // Find all <div> elements with class "n-listing-card__price" and extract their text
   $('img').each((index, element) => {

		
			    
				if(typeof( $(element).attr('class')) !== 'undefined') {
					if($(element).attr('class').toString() == 'wt-object-fit-cover wt-bg-gray wt-width-full')
					{
						imagePathStoreArray.push($(element).attr('src'));
					}
				
				}
				
				
				
		
  });

  // Output the extracted prices
  //console.log('Extracted Prices:');
  //console.log(prices);
    console.log("marker a");

//console.log(priceStoreArray[1]); 
//console.log(productURLArray[1]);

//console.log(productDescriptionArray[1]); 
//console.log(imagePathStoreArray[1]);


	let buildHtml = '';
	let allArray = [];
	
	let arrLine = [];
	
	priceStoreArray.forEach((element, index) => 
	{
	
		//console.log(element);
		//console.log(productURLArray[index]);
		//console.log(productDescriptionArray[index]);
	//	console.log(imagePathStoreArray[index]);
		
	//	buildHtml += `${element}<br/>${productURLArray[index]}<br/>${productDescriptionArray[index]}<br/><img src="${imagePathStoreArray[index]}"><br/><br/><br/>`
	 arrLine = [element, productURLArray[index], productDescriptionArray[index], imagePathStoreArray[index]];
	 allArray.push(arrLine);
	}
	);
	
 
		//console.log(allArray);
		
		const jsonData = JSON.stringify(allArray);
		
		res.send(jsonData);
		
		//console.log("marker c");
 
//	const filePath = 'output.html';

//	// Write the HTML content to the file
//	fs.writeFile(filePath, buildHtml, (err) => {
//		if (err) {
//			console.error(`Error writing HTML file: ${err}`);
//		} else {
//			console.log(`HTML file "${filePath}" has been created successfully.`);
//		}
//	});
	
  
 
});
  
  
  
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 



 
//console.log("marker a");
//console.log(priceStoreArray[0]); 
//console.log(productURLArray[0]);

 
 
 
 
 
 
 
 
 
 
 
 
 
	
	
}






const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});