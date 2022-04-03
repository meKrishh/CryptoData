// Instructions, to run the command line program, install the below dependencies

// npm install request 
// npm install promise
// npm install parser
// npm install await
// npm install yargs'

Utilized FileSystem(fs) module to create Read Stream for reading data from csv file "transactions.csv"

Created ouput array variable to store data of all three tokens(BTC,ETH,XRP)

Created three individual array of type key value pair to store type of token and amount of portfolio value for all three tokens(BTC,ETH,XRP)

Used If Else logic to store data into the respective key value array depending on conditions like type of token and transaction type.

Used getUSDValues() function to fetch dynamic value of the token in USD

Then multiplied  calculated portfolio values  by dynamic value of the token in USD.

Finally merged all three arrays into Output Array by pushing all the values to Output Array.

Achieved desired output.


//To run the code type :    node .\fetchCryptoData.js