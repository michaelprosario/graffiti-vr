using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentValidation;



namespace GraffitiVR.Model.Tests
{
    [TestClass]
    public class UserTests
    {
        string currentUser = "mrosario";
        [TestCleanup]
        public void TestCleanup(){
            UserRepo sketches = new UserRepo(currentUser);
            sketches.DeleteAll();
        }

        User getTestRecord(){
            User r = new User();
            r.UserName = "mrosario";
            r.FirstName = "Michael";
            r.LastName = "Rosario";
            r.UserName = "mrosario";
            r.Password = "password";
            return r;
        }


        [TestMethod]
        public void UserRepo__Add__ItShouldWork()
        {
            //arrange
            var r = getTestRecord();
            UserRepo repo = new UserRepo(currentUser);

            //act
            int id = repo.Add(r);

            //assert
            Assert.IsTrue(repo.RecordExists(id), "Make sure record exists.");
        }

        [TestMethod]
        public void UserRepo__IsValidLogin__HappyPath()
        {
            //arrange
            var r = getTestRecord();
            UserRepo repo = new UserRepo(currentUser);
            int id = repo.Add(r);

            //act
            bool result = repo.IsValidLogin("mrosario","password");
            

            //assert
            Assert.IsTrue(result, "valid is login");
        }
        
        public void UserRepo__IsValidLogin__SadPath()
        {
            //arrange
            var r = getTestRecord();
            UserRepo repo = new UserRepo(currentUser);
            int id = repo.Add(r);

            //act
            bool result = repo.IsValidLogin("mrosario","badpassword");
            

            //assert
            Assert.IsTrue(result == false, "valid is not login");
        }


        [TestMethod]
        public void UserRepo__GetRecord__ItShouldWork(){
            var r = getTestRecord();
            var repo = new UserRepo(currentUser);
            int id = repo.Add(r);
            var r2 = repo.GetRecord(id);
            Assert.IsTrue(r2.UserName == r.UserName);
        }

        [TestMethod]
        public void SketchRepo__GetAll__ItShouldWork(){
            
            var repo = new UserRepo(currentUser);

            for(int i=0; i<20; i++){
                var r = getTestRecord();
                int id = repo.Add(r);
            }

            List<User> records = repo.GetAll();
            Assert.IsTrue(records.Count == 20,"we should have 20 records.");
        }
        

        [TestMethod]
        public void UserRepo__Delete__ItShouldWork()
        {
            //arrange
            var r = getTestRecord();
            var repo = new UserRepo(currentUser);
            int id = repo.Add(r);

            //act
            repo.Delete(id);

            //assert
            Assert.IsTrue(!repo.RecordExists(id), "Make sure record does not exists.");
        }


        [TestMethod]
        public void UserRepo__Update__ItShouldWork()
        {
            //arrange
            var r = getTestRecord();
            UserRepo repo = new UserRepo(currentUser);
            int id = repo.Add(r);

            //act
            var r2 = repo.GetRecord(id);
            r2.UserName = "michael_rosario";
            repo.Update(r2);

            //assert
            var r3 = repo.GetRecord(id);
            Assert.IsTrue(r2.UserName == r3.UserName);
        }





    }
}
