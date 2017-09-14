using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentValidation;



namespace GraffitiVR.Model.Tests
{
    [TestClass]
    public class SketchTests
    {
        string currentUser = "mrosario";
        [TestCleanup]
        public void TestCleanup(){
            SketchRepo sketches = new SketchRepo(currentUser);
            sketches.DeleteAll();
        }

        Sketch getTestRecord(){
            Sketch aSketch = new Sketch();
            aSketch.Type = "javascript";
            aSketch.Code = "//code goes here " + DateTime.Now;
            aSketch.BlocklyXml = null;
            aSketch.Name = "test";
            aSketch.Tags = "";
            aSketch.CreatedBy = "system";
            aSketch.UpdatedBy = "system";

            return aSketch;

        }


        [TestMethod]
        public void SketchRepo__Add__ItShouldWork()
        {
            //arrange
            var aSketch = getTestRecord();
            SketchRepo sketches = new SketchRepo(currentUser);

            //act
            int id = sketches.Add(aSketch);

            //assert
            Assert.IsTrue(sketches.RecordExists(id), "Make sure record exists.");
        }

        [TestMethod]
        public void SketchRepo__GetRecord__ItShouldWork(){
            var aSketch = getTestRecord();
            SketchRepo sketches = new SketchRepo(currentUser);
            int id = sketches.Add(aSketch);
            var r2 = sketches.GetRecord(id);
            Assert.IsTrue(r2.Code == aSketch.Code);
        }

        [TestMethod]
        public void SketchRepo__GetAll__ItShouldWork(){
            
            SketchRepo sketches = new SketchRepo(currentUser);

            for(int i=0; i<20; i++){
                var aSketch = getTestRecord();
                int id = sketches.Add(aSketch);
            }

            List<Sketch> records = sketches.GetAll();
            Assert.IsTrue(records.Count == 20,"we should have 20 records.");
        }
        

        [TestMethod]
        public void SketchRepo__Delete__ItShouldWork()
        {
            //arrange
            var aSketch = getTestRecord();
            SketchRepo sketches = new SketchRepo(currentUser);
            int id = sketches.Add(aSketch);

            //act
            sketches.Delete(id);

            //assert
            Assert.IsTrue(!sketches.RecordExists(id), "Make sure record does not exists.");
        }


        [TestMethod]
        public void SketchRepo__Update__ItShouldWork()
        {
            //arrange
            var aSketch = getTestRecord();
            SketchRepo sketches = new SketchRepo(currentUser);
            int id = sketches.Add(aSketch);

            //act
            var r2 = sketches.GetRecord(id);
            aSketch.Code = "//change is hard";
            aSketch.Tags = "tag2";
            sketches.Update(r2);

            //assert
            var r3 = sketches.GetRecord(id);
            Assert.IsTrue(r2.Code == r3.Code);
            Assert.IsTrue(r2.Tags == r3.Tags);

        }


        [TestMethod]
        public void SketchValidator__HandleNoProblems(){
            var record = getTestRecord();
            SketchValidator validator = new SketchValidator();
            var result = validator.Validate(record);            
        
            Assert.IsTrue(result.Errors.Count == 0, "no errors");
        }


        [TestMethod]
        public void SketchValidator__HandleOneProblem(){
            var record = getTestRecord();
            record.Code = "";
            SketchValidator validator = new SketchValidator();
            var result = validator.Validate(record);            
        
            Assert.IsTrue(result.Errors.Count == 1, "one errors");
        }




    }
}
