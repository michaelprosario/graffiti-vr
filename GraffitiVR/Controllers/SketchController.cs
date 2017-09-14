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
            return "mrosario";
        }

        public SketchController()
        {
            string user = getCurrentUser();
            sketchRepo = new SketchRepo(user);
        }

        // GET: Sketch
        public IActionResult Index()
        {
            return View(sketchRepo.GetAll());
        }

        // GET: Sketch/Create
        public IActionResult Create()
        {
            Sketch aSketch = new Sketch();
            aSketch.Name = "Sketch " + DateTime.Now;
            aSketch.Type = "javascript";
            aSketch.Code = @"
var b = new Bot();
var i;

for(i=0; i<10; i++){
    b.drawBox(1,1,1);
    b.moveUp(2);
}
            ";
            int recordID = sketchRepo.Add(aSketch);            
            return RedirectToAction("Edit", new { id = recordID });
        }

        // POST: Sketch/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Id,Code,Name,Tags")] Sketch sketch)
        {
            if (ModelState.IsValid)
            {
                sketch.Type = "javascript";
                sketchRepo.Add(sketch);
                return RedirectToAction(nameof(Index));
            }
            return View(sketch);
        }

        // GET: Sketch/Edit/5
        public IActionResult Edit(int id)
        {

            var sketch = sketchRepo.GetRecord(id);
            if (sketch == null)
            {
                return NotFound();
            }
            return View(sketch);
        }

        public IActionResult ViewSketch(int id)
        {
            var sketch = sketchRepo.GetRecord(id);
            if (sketch == null)
            {
                return NotFound();
            }

            //Console.WriteLine(sketch.Code);
            ViewBag.Code = sketch.Code;
            return View(sketch);
        }
        

        // POST: Sketch/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Code,Name,Tags,CreatedBy,CreatedAt")] Sketch sketch)
        {
            if (id != sketch.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    sketch.Type = "javascript";
                    sketchRepo.Update(sketch);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SketchExists(sketch.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(sketch);
        }

        [HttpPost]
        public JsonResult UpdateSketch([FromBody]Sketch sketch)
        {
            try
            {
                sketch.Type = "javascript";
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
        


        // GET: Sketch/Delete/5
        public IActionResult Delete(int id)
        {

            
            if (!sketchRepo.RecordExists(id))
            {
                return NotFound();
            }

            var sketch = sketchRepo.GetRecord(id);

            return View(sketch);
        }

        // POST: Sketch/Delete/5
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
    }
}
