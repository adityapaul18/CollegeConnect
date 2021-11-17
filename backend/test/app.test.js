const app = require("../index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const path = require("path");

const { expect } = chai;
chai.use(chaiHttp);

var token="";
var userId="";
var tagId="";
var postId="";
var answerId="";

describe("Server!", () => {
/*
User auth APIs
*/
  it("Register User",done=>{
    chai
      .request(app)
      .post("/api/register")
      .send({
        'name':'Test Case',
        'email':'testcase@gmail.com',
        'password':'Dummy123@',
        'confirmPassword':'Dummy123@'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Registered user successfully");
        token=res.body.token;
        userId=res.body.user._id
        done();
      });
  });

  it("Login user",done=>{
    chai
      .request(app)
      .post("/api/login")
      .send({
        'email':'testcase@gmail.com',
        'password':'Dummy123@'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("LoggedIn user successfully");
        done();
      });
  });

  /*
  Profile API
  */

it("Fetch all profiles", done => {
  chai
    .request(app)
    .get("/api/profile/all")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched user profiles successfully");
      done();
    });
});

it("Fetch Single Profile", done => {
  chai
    .request(app)
    .get(`/api/profile/single/${userId}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched user profile successfully");
      done();
    });
});

it("Fetch custom profiles",done=>{
  chai
    .request(app)
    .get(`/api/profile/custom`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched customised profiles successfully");
      done();
    })
});

/*
Tag API
*/
it("Fetch all tags", done => {
  chai
    .request(app)
    .get("/api/tag/all")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Tags fetched successfully");
      tagId = res.body.tags[0]._id;
      done();
    });
});

it("Fetch following tags",done=>{
  chai
    .request(app)
    .get(`/api/tag/follow`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched followed tags successfully");
      done();
    })
});

it("Follow a tag",done=>{
  chai
    .request(app)
    .get(`/api/tag/${tagId}`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("You are following this tag");
      done();
    })
});

/*
Post API
*/
it("Fetch all posts", done => {
  chai
    .request(app)
    .get("/api/post/all")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched posts successfully");
      postId = res.body.posts[3]._id;
      answerId = res.body.posts[3].answer[0]._id;
      done();
    });
});

it("Fetch single post", done => {
  chai
    .request(app)
    .get(`/api/post/single/${postId}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched post successfully");
      done();
    });
});

it("Fetch user posts", done => {
  chai
    .request(app)
    .get(`/api/post/user/${userId}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched user posts successfully");
      done();
    });
});

it("Fetch feed",done=>{
  chai
    .request(app)
    .get(`/api/feed`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetched feed successfully");
      done();
    })
});

it("Upvote answer",done=>{
  chai
    .request(app)
    .put(`/api/post/upvote`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'postId':postId,
      'answerId':answerId
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Answer upvoted successfully!");
      done();
    })
});

it("Downvote answer",done=>{
  chai
    .request(app)
    .put(`/api/post/downvote`)
    .set({'Authorization':`Bearer ${token}`})
    .send({
      'postId':postId,
      'answerId':answerId
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Answer downvoted successfully!");
      done();
    })
});

it("Save a post",done=>{
  chai
    .request(app)
    .get(`/api/post/save/${postId}`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Saved post successfully");
      done();
    })
});

it("Fetch saved posts",done=>{
  chai
    .request(app)
    .get(`/api/savedPost/all`)
    .set({'Authorization':`Bearer ${token}`})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equals("Fetch saved post successfully");
      done();
    })
});






});
