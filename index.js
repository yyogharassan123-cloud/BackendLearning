const express = require(("express")); // Import the Express library
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req,res) => {
    res.send("Hey This is my firsttime using this express.js");
}); 
/* get = HTTP GET request 
       / = called a route */


const users = [
        {
            id: 1,
            name: "Yogha",
            role: "Super Admin",  
            Status: true
        },

        {
            id: 2,
            name: "Ali",
            role: "Admin",
            Status: true
        },

        {
            id: 3,
            name: "Siva72361",
            role: "User",
            Status: false
        }

    ];

app.get("/users/:id", (req,res) => {

    //res.send("List of users");

    /*
             res.json()
    Specifically sends JSON.
    Express also automatically tells the client:
    "I'm sending JSON data."
    That's why we use res.json() for APIs.
    */
    //res.json(users);

   /* console.log(req.params); //req.params → values from the URL.

    res.json({

        message: "User Id received",
        id: req.params.id

    });*/


    const user = users.find(u => u.id === Number(req.params.id));
    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        });
    }
    res.json(user);

});

app.get("/products", (req,res) => {
    res.send("List of products");
});

app.get("/about", (req,res) => {
    res.send("About this application");
});

const ticket = [
    {
    ticketId:1,
    title:"Cannot login",
    status:"Pending",
    priority:"High",
    current_assign : "Yogha"

    },

    {
    ticketId:3,
    title:"login need longer time",
    status:"Pending",
    priority:"High",
    current_assign : "raju"

    },
    {
    ticketId:4,
    title:"Laptop slow",
    status:"In progress",
    priority:"Low",
    current_assign : "Yogha"

    }
];

app.get("/tickets/:ticketId", (req,res) =>{
    
    const tickets = ticket.find(t => t.ticketId === Number(req.params.ticketId));
    if(!tickets){

        return res.status(404).json({
            message: "Ticket Not Found"
        });
    } 

    res.json(tickets);


});

const balls = [
  { id: 1, name: "Basketball", color: "orange", size: "large", material: "rubber", isInStock: true, price: 29.99 },
  { id: 2, name: "Tennis Ball", color: "yellow", size: "small", material: "felt", isInStock: true, price: 4.50 },
  { id: 3, name: "Soccer Ball", color: "white", size: "medium", material: "leather", isInStock: false, price: 19.99 },
  { id: 4, name: "Eight Ball", color: "black", size: "small", material: "acrylic", isInStock: true, price: 12.00 },
  { id: 5, name: "Volleyball", color: "white", size: "medium", material: "synthetic", isInStock: true, price: 22.50 }
];

app.get("/balls", (req,res) => {
    const {size} = req.query; // Called object destructuring. It's a shorthand way to extract values from objects. will learn later

    if(!size){
        return res.json(balls);
    }
    const filteredBalls = balls.filter( // filter() = Creates a new array with all elements that pass the test implemented by the provided function.
        b => b.size === size
    );
    res.json(filteredBalls);

});

app.get("/search", (req,res) => {

    console.log(req.query);
    res.json(req.query);

});

app.post("/users", (req,res) => {
      console.log(req.body);

    res.json(
        {
            message: "User created successfully",
            data: req.body
        });
});

app.patch("/balls/:id", (req,res) => {
    const ball= balls.find(
    b => b.id === Number(req.params.id));

    if(!ball){
        return res.status(404).json({
            message: "The ball not found in database"
        });
    }
    Object.assign(ball,req.body); // object.assign() = Copies the values of all enumerable own properties from one or more source objects to a target object. It returns the target object.

    res.json({
        message: "Ball updated sucessfully",
        data: ball
    });

});


app.listen(3000,() => {
    console.log("Server is running on port 3000");
});
/* 
listen () = Start waiting for incoming requests.
3000 = port 
*/

