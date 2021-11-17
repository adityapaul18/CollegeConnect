const app = require("../index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const path = require("path");

const { expect } = chai;
chai.use(chaiHttp);

var token="";
var resetPasswordToken="";
var userId="";
var postId="";
var answerId="";

describe("Server!", () => {
  it("Welcomes user to the api", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });

/*
User auth APIs
*/
  it("Signup user",done=>{
    chai
      .request(app)
      .post("/api/signup")
      .send({
        'firstName':'Riya',
        'lastName':'Desai',
        'email':'riya@gmail.com',
        'password':'Riya123@',
        'userType':'Coach'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Successfully sign up. Please verify your email- riya@gmail.com");
        verificationToken=res.body.verificationToken;
        done();
      });
  });

  it("Verify email",done=>{
    chai
      .request(app)
      .post(`/api/verify/${verificationToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Email verified successfully");
        done();
      });
  });

  it("Login user",done=>{
    chai
      .request(app)
      .post("/api/signin")
      .send({
        'email':'riya@gmail.com',
        'password':'Riya123@'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Successful login");
        expect(res.body.user).to.be.a("object");
        token=res.body.token;
        userId=res.body.user._id;
        done();
      });
  });

  it("Send reset password link",done=>{
    chai
      .request(app)
      .post("/api/resetLink")
      .send({
        'email':'riya@gmail.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Password reset link sent successfully");
        resetPasswordToken=res.body.resetPasswordToken;
        done();
      })
  });

  it("Reset password",done=>{
    chai
      .request(app)
      .put(`/api/resetPassword/${resetPasswordToken}`)
      .send({
        'newPassword':'Dummy123@',
        'confirmNewPassword':'Dummy123@'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Reset password successfully");
        done();
      })
  });

  it("Update User Details",done=>{
    chai
      .request(app)
      .put(`/api/update/${userId}`)
      .set({'Authorization':`Bearer ${token}`})
      .send({
        'firstName':'Vidhi'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Account details updated successfully");
        done();
      })
  });

  /*
  Admin Auth
  */
  it("Login user",done=>{
    chai
      .request(app)
      .post("/api/admin/signin")
      .send({
        'email':'admin@gmail.com',
        'password':'Dummy123@'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Login successfully");
        adminToken=res.body.token;
        done();
      });
  });
/*
Category APIs
*/
it("Fecth all categories", done => {
  chai
    .request(app)
    .get("/api/category/getcategories")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched categories successfully");
      expect(res.body.categories).to.be.a("array");
      done();
    });
});

/*
Category Admin API
*/
it("Create Category",done=>{
  chai
    .request(app)
    .post(`/api/category/create`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .set('content-type', 'multipart/form-data')
    .field('name','Dummy Category')
    .field('description','Dummy Description')
    .attach('categoryImage',path.resolve(__dirname, "../images/test.jpg"))
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Category created successfully");
      expect(res.body.category).to.be.a("object");
      done();
    })
});

/*
Product APIs
*/
it("Fetch all products", done => {
  chai
    .request(app)
    .get("/api/product/all/search?page=1&limit=3")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched products successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch single product by ID", done => {
  chai
    .request(app)
    .get("/api/product/single/60c7c4bc71928f3a9f5c9838")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched product successfully");
      expect(res.body.product).to.be.a("object");
      done();
    });
});

it("Fetch filtered products", done => {
  chai
    .request(app)
    .post("/api/product/filter/search?page=1&limit=3")
    .set({
      'upperLimit':20000,
      'lowerLimit':5000
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched filtered products successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch products by search", done => {
  chai
    .request(app)
    .get("/api/product/search?page=1&limit=3&keyword=robot")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched searched products successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch products by arrival", done => {
  chai
    .request(app)
    .get("/api/product/arrival/search?page=1&limit=3")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched products by arrival successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch products by sold", done => {
  chai
    .request(app)
    .get("/api/product/seller/search?page=1&limit=3")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched bestseller products successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch products by sales", done => {
  chai
    .request(app)
    .get("/api/product/sales/search?page=1&limit=3")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched best sales product successfully");
      expect(res.body.products.results).to.be.a("array");
      done();
    });
});

it("Fetch related products", done => {
  chai
    .request(app)
    .get("/api/product/related/60c7b40dd958d12fa031d395")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched related products successfully");
      done();
    });
});

/*
Product Admin APIs
*/
it("Create Product",done=>{
  chai
    .request(app)
    .post(`/api/product/create`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .set('content-type', 'multipart/form-data')
    .field('name','Dummy Product')
    .field('description','Dummy Description')
    .field('price',10000)
    .field('quantity',30)
    .field('sold',12)
    .field('playerDiscount',20)
    .field('coachDiscount',15)
    .field('category[0]','60c7b40dd958d12fa031d395')
    .field('category[1]','60c7aba386df9f28da6aa809')
    .field('rating',4)
    .field('videoUrl','https://www.youtube.com/embed/QvRu7IH1Bjs')
    .field('offerEnd','20 June 2023')
    .attach('images',path.resolve(__dirname, "../images/test.jpg"))
    .attach('userManual',path.resolve(__dirname, "../images/dummy.pdf"))
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product created successfully");
      expect(res.body.product).to.be.a("object");
      productId=res.body.product._id;
      done();
    })
});

it("Update Product Details",done=>{
  chai
    .request(app)
    .put(`/api/product/update/60c7cc74ad7a8f3e4146cceb`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .send({
      'name':'TT Catch Net',
      'sold':19,
      'quantity':25
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product updated successfully");
      done();
    })
});

it("Delete Product",done=>{
  chai
    .request(app)
    .delete(`/api/product/delete/${productId}`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product deleted successfully");
      done();
    })
});

/*
Address APIs
*/
it("Add/Update user's address",done=>{
  chai
    .request(app)
    .put(`/api/user/updateAddress/${userId}`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'firstName':'Riya',
      'lastName':'Desai',
      'email':'riya@gmail.com',
      'phone':'9999123456',
      'al1':'Al1',
      'al2':'Al2',
      'city':'City',
      'state':'State',
      'pinCode':'365002',
      'country':'India'
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it("Fetch user's address",done=>{
  chai
    .request(app)
    .get(`/api/user/getaddress`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

/*
Cart APIs
*/
it("Add item to cart",done=>{
  chai
    .request(app)
    .post(`/api/user/cart/addtocart`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId,
      'item':{
        'product':'60c7cc74ad7a8f3e4146cceb',
        'quantity':2
      }
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it("Change quantity in cart",done=>{
  chai
    .request(app)
    .post(`/api/user/cart/quantity`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId,
      'productId':'60c7cc74ad7a8f3e4146cceb',
      'type':'increase'

    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product quantity changed");
      done();
    })
});

it("Fetch user cart",done=>{
  chai
    .request(app)
    .get(`/api/user/cart/${userId}`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched cart successfully");
      done();
    })
});

it("Remove item from cart",done=>{
  chai
    .request(app)
    .post(`/api/user/cart/removeItem`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId,
      'productId':'60c7cc74ad7a8f3e4146cceb',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product removed successfully");
      done();
    })
});

it("Delete cart",done=>{
  chai
    .request(app)
    .post(`/api/user/cart/deleteCart`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Cart deleted successfully");
      done();
    })
});

/*
Wishlist APIs
*/
it("Add item to wishlist",done=>{
  chai
    .request(app)
    .post(`/api/user/wishlist/addItem`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId,
      'item':{
        'product':'60c7cc74ad7a8f3e4146cceb',
        'quantity':2
      }
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it("Fetch user wishlist",done=>{
  chai
    .request(app)
    .get(`/api/user/wishlist/${userId}`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched wishlist successfully");
      done();
    })
});

it("Remove item from wishlist",done=>{
  chai
    .request(app)
    .post(`/api/user/wishlist/removeItem`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId,
      'productId':'60c7cc74ad7a8f3e4146cceb',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Product removed successfully");
      done();
    })
});

it("Delete wishlist",done=>{
  chai
    .request(app)
    .post(`/api/user/wishlist/delete`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'user':userId
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Wishlist deleted successfully");
      done();
    })
});

/*
Orders API
*/
it("Get user's orders",done=>{
  chai
    .request(app)
    .get(`/api/getOrders/${userId}`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

/*
Admin Order APIs
*/
it("Get customers orders",done=>{
  chai
    .request(app)
    .get(`/api/order/getCustomerOrders`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched orders successfully");
      done();
    })
});

it("Update Order Status",done=>{
  chai
    .request(app)
    .put(`/api/order/update`)
    .set({'Authorization':`Bearer ${adminToken}`})
    .send({
      'orderId':'60c7d9e2ad7a8f3e4146ccef',
      'type':'packed',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Updated order status");
      done();
    })
});

});
