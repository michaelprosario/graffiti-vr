using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;

namespace GraffitiVR.Model
{
    public class SketchRepo
    {
        string _currentUser;
        public SketchRepo(string currentUser){
            if(string.IsNullOrEmpty(currentUser)){
                throw new ArgumentNullException("Current user is null or not defined.");
            }else{
                _currentUser = currentUser;
            }
        }

        GraffitiVR.Model.GraffitiVRContext getContext(){
            var db = new GraffitiVR.Model.GraffitiVRContext();
            return db;

        }

        public int Add(Sketch record){
            if(record == null){
                throw new ArgumentNullException();
            }



            record.CreatedBy = _currentUser;
            record.UpdatedBy = _currentUser;
            record.CreatedAt = DateTime.Now;
            record.UpdatedAt = record.CreatedAt;

            SketchValidator validator = new SketchValidator();
            validator.ValidateAndThrow(record);



         
            using(var db = getContext() ){
                db.Sketches.Add(record);
                db.SaveChanges();
            }

            return record.Id;
        }

        public bool RecordExists(int id){
            int recordCount = 0;
            using(var db = getContext() ){
                recordCount = db.Sketches.Where( r => r.Id == id).Count();
            }

            return recordCount > 0;
        }

        public void Delete(int id){

            if(!RecordExists(id))
            {
                throw new ApplicationException("Record does not exist: " + id);
            }


            using(var db = getContext() ){
                var record = db.Sketches.Where(r => r.Id == id).FirstOrDefault();
                db.Sketches.Remove(record);
                db.SaveChanges();
            }
        }

        public Sketch GetRecord(int id){
            if(!RecordExists(id))
            {
                throw new ApplicationException("Record does not exist: " + id);
            }

            Sketch returnRecord;
            using(var db = getContext() ){
                returnRecord = db.Sketches.Where(r => r.Id == id).FirstOrDefault();
            }

            return returnRecord;
        }

        public void DeleteAll(){

            using(var db = getContext() ){

                var rows = from o in db.Sketches
                select o;
                foreach (var row in rows)
                {
                    db.Sketches.Remove(row);
                }
                db.SaveChanges();
                
            }

        }

        public void Update(Sketch aRecord){
            if(aRecord == null){
                throw new ArgumentNullException();
            }

            aRecord.UpdatedBy = _currentUser;
            aRecord.UpdatedAt = DateTime.Now;

           SketchValidator validator = new SketchValidator();
           validator.ValidateAndThrow(aRecord);
             

            using(var db = getContext() ){
                db.Update(aRecord);
                db.SaveChanges();
                
            }            
        }

        public List<Sketch> GetAll(){
            List<Sketch> sketches;

            using(var db = getContext() ){
                sketches = db.Sketches.ToList();
            }

            return sketches;
        }
    }
}
