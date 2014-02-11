##Todo

- Configure uploading to amazon
- Configure downloading from amazon
- Make calculation of predicted data
- Show prediction
- Make bar chart
- delete aws stuff
- clean up response body stuff in route
- deleted commented
- make sure you handle report id's which throw errors
- switcher between types of graphs
- delete conslogs
- make charts functions into one function
- prepare qus and opinions

####Done

- Make d3 chart reusable
- Angularjs config
- Mongodb/mongohq config
- POST to `/algorithms` uploads CSV to mongodb via angularjs and mongohq
- Basic d3 line graph built from `GET jobs/:jobId` which returns CSV data from db.
- Deploy using heroku
- redirect to job permalink
- refactor jobs to report and algorithms to upload


##PART 1
 
Create a simple API using Node.js. 
When we make a post request with a url of some csv data (eg http://aedata-tmp.s3.amazonaws.com/seriesA080328.csv), the server should return a JobId.
When we make a get request with the JobId previously returned we will get the results of the computation in a json file. The computation should be done however you want and it will make a dummy prediction for the next 20 values of the y variable. The api should then return an html file with the original data, the calculation, and some graph in d3.js (e.g. [blocks](http://bl.ocks.org/)mbostock/3883245) that represents the prediction.

Example

Post request to run Algorithm "000000"

	curl -v -H "Content-Type: application/json" -X POST --data '{"url":"http://aedata-tmp.s3.amazonaws.com/seriesA080328.csv"}' http://myserver/algorithms/000000:


Response Body: 

	{"jobId": "99db77396f152e113e9b94a915055e6e73a5a40f}

Get request

	myserver/jobs/99db77396f152e113e9b94a915055e6e73a5a40f


Response Body

    {
        "id": "",
        "result": {


          "htmlreport":{"url to report"}
           },
        "status": "" 

    } 


2.
Create a frontend in Angular.js for users to upload their own link to a csv file and get back an html report with the prediction on the values.

BONUS: Please enhance backend API above to have all the data uploaded by the users to be uploaded directly to an Amazon S3 bucket, make the data upload bypass the api server by getting a policy from the server and using the policy to upload directly the files to S3 from the client. Find attached some examples of an angular api that does that (sierpinski.zip)

BONUS: Enhance the visualization by making it reusable. [http://bost.ocks.org/mike/chart/](http://bost.ocks.org/mike/chart/)
We don't mean simply using some of the many d3 based visualization libraries, but instead try to develop a roadmap to transform many of the available examples ( [http://bost.ocks.org/mike/](http://bost.ocks.org/mike/) , 
[http://christopheviau.com/d3list/gallery.html](http://christopheviau.com/d3list/gallery.html) ) into reusable charts. Find attached one book that explains in detail how to do this with Angular.

Feel free to improve or simplify whatever you want.

Here are some resources for you.
Angular:

- [http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html](http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html)

Node.js

- [http://www.hacksparrow.com/express-js-tutorial.html](http://www.hacksparrow.com/express-js-tutorial.html)
- [http://javascriptissexy.com/learn-node-js-completely-and-with-confidence/](http://javascriptissexy.com/learn-node-js-completely-and-with-confidence/)

We suggest you to use MongoDB as your database, maintain the code using Github.com and make the deployment using Heroku.

Let us know if you have any questions at any time. We would be glad to help you and guide you through this task if you find it interesting enough.

We know this might be a lot of work but just take your time and let us know your advances, as soon as we hear from you we can set up another skype chat.


##PART 2

Suppose you have a Retailer Data Table with the following information fields:

	“cust_id” : Customer ID
	“trans_id” : Transaction ID
	“date” : Date of transaction
	“Code” : Product Code

These will help us identify who bought what, when, and in which transaction.

Write down 10 specific questions that can be answered with this data set and suggest some computations to build next in the API you created so we can sell this report to a Store Manager.

Example: 
What is the pair of products that will be bought together every monday so I can put them in promotion? - COMP: Analyze correlations of products bought together, or build a recommendation engine for products.

This is just a brainstorming exercise, feel free to throw any ideas that come to your mind.

###Answer

1. Customer clustering into groups by products.
2. Associating dates with products
3. Patterns of customer buying
4. Do people buy same product several times
5. Which products are only bought once and never again.
6. Summer based products
7. which brand
8. associate with location
9. time of day
10. day of the month
11. what day of the week/month people eat fruit/things that will go off
12. what more brands to buy
13. what more category of product to get
14. predict how much stock to buy
15. what's selling badly? try out with promotion
16. suggest products to put on promotion
17. suggest products to 

----------

011969310606