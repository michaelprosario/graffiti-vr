using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GraffitiVR.Model;

namespace GraffitiVR.Controllers
{
    public class SketchController : Controller
    {
        private readonly SketchRepo sketchRepo;
        
        string getCurrentUser(){
            return "system";
        }

        public SketchController()
        {
            string user = getCurrentUser();
            sketchRepo = new SketchRepo(user);
        }

        public IActionResult Index()
        {
            return View(sketchRepo.GetAll());
        }

        public IActionResult Create()
        {
            Sketch aSketch = new Sketch();
            aSketch.Name = "Sketch " + DateTime.Now;
            aSketch.Type = "javascript";
            aSketch.Code = @"
// Let us create a bot
var bot = new Bot();
var i;

// Using code, we can move and draw with the bot
for(i=0; i<10; i++){
    bot.drawBox(1,1,1);
    bot.moveUp(2);
}
            ";
            int recordID = sketchRepo.Add(aSketch);            
            return RedirectToAction("Edit", new { id = recordID });
        }

        public IActionResult Edit(int id)
        {
            var sketch = sketchRepo.GetRecord(id);
            if (sketch == null)
            {
                return NotFound();
            }
            return View(sketch);
        }
          
        [HttpPost]
        public JsonResult UpdateSketch([FromBody]Sketch sketch)
        {

            var oldRecordState = sketchRepo.GetRecord(sketch.Id);
            sketch.CreatedAt = oldRecordState.CreatedAt;
            sketch.CreatedBy = oldRecordState.CreatedBy;
            sketch.UpdatedAt = DateTime.Now;
            sketch.UpdatedBy = oldRecordState.UpdatedBy;

            try
            {
                sketch.UpdatedBy = getCurrentUser();
                sketchRepo.Update(sketch);
                return Json(new { result = "ok"} );
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SketchExists(sketch.Id))
                {
                    return Json(new { result = "record_not_found"} );
                }
                else
                {
                    throw;
                }
            }
        }  
        
        public IActionResult Delete(int id)
        {
            if (!sketchRepo.RecordExists(id))
            {
                return NotFound();
            }

            var sketch = sketchRepo.GetRecord(id);

            return View(sketch);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            sketchRepo.Delete(id);
            return RedirectToAction(nameof(Index));
        }

        private bool SketchExists(int id)
        {
            return sketchRepo.RecordExists(id);
        }

        public ActionResult CreateBlockly()
        {
            var record = new Sketch();
            record.Name = $"Blockly Sketch - {DateTime.Now}";
            record.Code = "//code goes here";
            record.BlocklyXml = "";
            record.Tags = "";
            record.Type = "blockly";

            int id = sketchRepo.Add(record);

            return RedirectToAction("EditBlockly", new { id = id });
        }

        public ActionResult EditBlockly(int id)
        {
            if (!sketchRepo.RecordExists(id))
            {
                return NotFound();
            }
            
            var record = sketchRepo.GetRecord(id);
            return View(record);
        }

        public ActionResult RenderSketch(int id)
        {
            if (!sketchRepo.RecordExists(id))
            {
                return NotFound();
            }
            
            var record = sketchRepo.GetRecord(id);
            return View(record);
        }
    
        public ActionResult RenderSketchInAR(int id)
        {
            if (!sketchRepo.RecordExists(id))
            {
                return NotFound();
            }
            
            var record = sketchRepo.GetRecord(id);
            return View(record);
        }

        public ActionResult OpenBotDrawDocumentation(){
            return View();
        }

        public ActionResult SampleCode(){
            return View();
        }
        
    }
}
