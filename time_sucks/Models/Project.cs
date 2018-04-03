using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public int CourseID { get; set; }
        public int UserID { get; set; }
        public bool IsActive { get; set; }

    }
}
