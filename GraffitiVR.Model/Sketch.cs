using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraffitiVR.Model
{
    public class Sketch{

        public Sketch(){

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]    
        public int Id { get; set; }

        public string Type { get; set; }
        public string Code { get; set; }
        public string BlocklyXml { get; set; }
        public string Name { get; set; }
        public string Tags { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}