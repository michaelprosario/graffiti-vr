using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;

namespace GraffitiVR.Model
{
    public class UserRepo
    {
        string _currentUser;
        public UserRepo(string currentUser){
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

        public int Add(User record){
            if(record == null){
                throw new ArgumentNullException();
            }



            record.CreatedBy = _currentUser;
            record.UpdatedBy = _currentUser;
            record.CreatedAt = DateTime.Now;
            record.UpdatedAt = record.CreatedAt;

            UserValidator validator = new UserValidator();
            validator.ValidateAndThrow(record);



         
            using(var db = getContext() ){
                db.Users.Add(record);
                db.SaveChanges();
            }

            return record.Id;
        }

        public bool RecordExists(int id){
            int recordCount = 0;
            using(var db = getContext() ){
                recordCount = db.Users.Where( r => r.Id == id).Count();
            }

            return recordCount > 0;
        }

        public void Delete(int id){

            if(!RecordExists(id))
            {
                throw new ApplicationException("Record does not exist: " + id);
            }


            using(var db = getContext() ){
                var record = db.Users.Where(r => r.Id == id).FirstOrDefault();
                db.Users.Remove(record);
                db.SaveChanges();
            }
        }

        public User GetRecord(int id){
            if(!RecordExists(id))
            {
                throw new ApplicationException("Record does not exist: " + id);
            }

            User returnRecord;
            using(var db = getContext() ){
                returnRecord = db.Users.Where(r => r.Id == id).FirstOrDefault();
            }

            return returnRecord;
        }

        public void DeleteAll(){

            using(var db = getContext() ){

                var rows = from o in db.Users
                select o;
                foreach (var row in rows)
                {
                    db.Users.Remove(row);
                }
                db.SaveChanges();
                
            }

        }

        public void Update(User aRecord){
            if(aRecord == null){
                throw new ArgumentNullException();
            }

            aRecord.UpdatedBy = _currentUser;
            aRecord.UpdatedAt = DateTime.Now;

           UserValidator validator = new UserValidator();
           validator.ValidateAndThrow(aRecord);
             

            using(var db = getContext() ){
                //db.Entry(aRecord).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.Update(aRecord);
                db.SaveChanges();
                
            }            
        }

        public bool IsValidLogin(string userName, string password){
            bool result=false;
            
            using(var db = getContext() ){
                result = db.Users.Where(r => r.UserName == userName && r.Password == password).Count() > 0;
            }

            return result;
        }

        public List<User> GetAll(){
            List<User> records;

            using(var db = getContext() ){
                records = db.Users.ToList();
            }

            return records;
        }
    }
}
